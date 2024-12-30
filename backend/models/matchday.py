from django.db import models

MATCH_TYPES = {
    ("bo1", "Best of 1"),
    ("bo2", "Best of 2"),
    ("bo3", "Best of 3"),
    ("bo5", "Best of 5"),
}

class Matchday(models.Model):
    date = models.DateField(
        blank=True,
        null=True
    )
    match_type = models.CharField(
            max_length=3, 
            choices=MATCH_TYPES, 
            default="bo2"
    )
    set_id = models.CharField(
        blank=True,
        null=True
    )

    def __str__(self):
        return f"Matchday {self.id}"