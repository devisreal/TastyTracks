# Generated by Django 4.2 on 2024-03-12 02:55

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('menu', '0010_menuitem_image_1_menuitem_image_2_menuitem_image_3_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='CartItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.PositiveIntegerField(default=1)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('menu_item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='menu.menuitem')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
