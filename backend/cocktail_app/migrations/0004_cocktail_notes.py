# Generated by Django 5.0 on 2023-12-19 22:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cocktail_app', '0003_alter_cocktail_favorites_list'),
    ]

    operations = [
        migrations.AddField(
            model_name='cocktail',
            name='notes',
            field=models.TextField(null=True),
        ),
    ]
