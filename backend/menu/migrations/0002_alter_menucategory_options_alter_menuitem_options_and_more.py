# Generated by Django 4.2 on 2024-03-06 00:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('menu', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='menucategory',
            options={'verbose_name': 'Menu Category', 'verbose_name_plural': 'Menu Categories'},
        ),
        migrations.AlterModelOptions(
            name='menuitem',
            options={'verbose_name': 'Menu Item', 'verbose_name_plural': 'Menu Items'},
        ),
        migrations.AlterModelOptions(
            name='menuitemimage',
            options={'verbose_name': 'Menu Image', 'verbose_name_plural': 'Menu Images'},
        ),
        migrations.RemoveField(
            model_name='menuitem',
            name='image',
        ),
    ]
