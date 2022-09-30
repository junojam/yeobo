# Generated by Django 4.1.1 on 2022-09-28 04:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('yeobo', '0001_yeobo2'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('user_id', models.BigAutoField(primary_key=True, serialize=False)),
                ('age', models.IntegerField(blank=True, null=True)),
                ('email', models.CharField(blank=True, max_length=255, null=True)),
                ('gender', models.CharField(blank=True, max_length=255, null=True)),
                ('nickname', models.CharField(blank=True, max_length=255, null=True)),
                ('password', models.CharField(blank=True, max_length=255, null=True)),
                ('profile_path', models.CharField(blank=True, max_length=255, null=True)),
                ('refresh_token', models.CharField(blank=True, max_length=255, null=True)),
                ('role', models.CharField(blank=True, max_length=255, null=True)),
            ],
            options={
                'db_table': 'user',
                'managed': False,
            },
        ),
        migrations.RenameField(
            model_name='attraction',
            old_name='areacode',
            new_name='area_code',
        ),
        migrations.RenameField(
            model_name='attraction',
            old_name='readcount',
            new_name='read_count',
        ),
    ]