# Generated by Django 4.2.3 on 2023-11-19 11:21

import Gsite.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Gsite', '0013_authorprofile'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='image',
            field=models.ImageField(default='users/user.png', upload_to=Gsite.models.user_directory_path),
        ),
        migrations.AlterField(
            model_name='authorprofile',
            name='image',
            field=models.ImageField(default='users/logo_f.png', upload_to=Gsite.models.user_directory_path),
        ),
    ]
