# Generated by Django 5.0 on 2023-12-19 22:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cocktail_app', '0004_cocktail_notes'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cocktail',
            name='cocktail_id',
            field=models.CharField(),
        ),
    ]
