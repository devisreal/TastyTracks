import random
from django.core.mail import EmailMessage, send_mail
from users.models import User, OneTimePassword
from django.conf import settings


def generate_otp():
    otp = ""
    for i in range(6):
        otp += str(random.randint(0, 9))
    return otp


def send_code_to_user(email):
    subject = "One time password for email verficiation"
    otp_code = generate_otp()
    print(otp_code)
    user = User.objects.get(email=email)
    current_site = "sample.com"
    email_body = (
        "Hi "
        + user.first_name
        + " "
        + user.last_name
        + "\n\n"
        + "Use this OTP to verify your email address.\n"
        + otp_code
        + "\n\n"
        + "Regards,\nFood Ordering Team"
    )
    from_email = settings.DEFAULT_FROM_EMAIL

    OneTimePassword.objects.create(user=user, code=otp_code)

    send_mail = EmailMessage(
        subject=subject, body=email_body, from_email=from_email, to=[email]
    )
    send_mail.send(fail_silently=True)


def send_normal_email(data):
    email = EmailMessage(
        subject=data["email_subject"],
        body=data["email_body"],
        from_email=settings.EMAIL_HOST_USER,
        to=[data["to_email"]],
    )
    email.send()
