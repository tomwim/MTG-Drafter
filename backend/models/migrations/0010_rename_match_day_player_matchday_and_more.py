# Generated by Django 4.2.17 on 2025-01-10 18:56

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('models', '0009_alter_player_cannot_play_alter_player_match_day_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='player',
            old_name='match_day',
            new_name='matchday',
        ),
        migrations.AlterField(
            model_name='matchday',
            name='match_type',
            field=models.CharField(choices=[('bo1', 'Best of 1'), ('bo3', 'Best of 3'), ('bo2', 'Best of 2'), ('bo5', 'Best of 5')], default='bo2', max_length=3),
        ),
        migrations.AlterField(
            model_name='player',
            name='cannot_play',
            field=models.CharField(choices=[('r', 'red'), ('g', 'green'), ('w', 'white'), ('b', 'black'), ('u', 'blue')], default='w', max_length=1),
        ),
        migrations.AlterField(
            model_name='player',
            name='must_play',
            field=models.CharField(choices=[('r', 'red'), ('g', 'green'), ('w', 'white'), ('b', 'black'), ('u', 'blue')], default='w', max_length=1),
        ),
        migrations.AlterField(
            model_name='player',
            name='plays',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(choices=[('r', 'red'), ('g', 'green'), ('w', 'white'), ('b', 'black'), ('u', 'blue')], default='w', max_length=1), blank=True, default=list, size=5),
        ),
    ]