from django.db import models

class Member(models.Model):
    name = models.CharField(max_length=30)
    display_name = models.CharField(max_length=30)

    def __str__(self):
        return f"{self.display_name} ({self.name})"