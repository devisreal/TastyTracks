import random
from django.core.mail import EmailMessage
from users.models import User, OneTimePassword
from django.conf import settings
from django.template.loader import render_to_string


def generate_otp():
    otp = ""
    for i in range(6):
        otp += str(random.randint(0, 9))
    return otp


def send_verification_otp(email):
    subject = "Action Required: Verify Your Account to Get Started"
    otp_code = generate_otp()
    print(otp_code)
    user = User.objects.get(email=email)

    from_email = settings.DEFAULT_FROM_EMAIL
    OneTimePassword.objects.create(user=user, code=otp_code)

    recipient_name = user.first_name + " " + user.last_name
    html_content = render_to_string(
        "verify_email.html", {"recipient_name": recipient_name, "otp": otp_code}
    )
    send_mail = EmailMessage(
        subject=subject, body=html_content, from_email=from_email, to=[email]
    )
    send_mail.content_subtype = "html"
    send_mail.send(fail_silently=True)


def send_normal_email(data):
    email = EmailMessage(
        subject=data["email_subject"],
        body=data["email_body"],
        from_email=settings.EMAIL_HOST_USER,
        to=[data["to_email"]],
    )
    email.content_subtype = "html"
    email.send()    