from django.db import models

class Person(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    display_name = models.CharField(max_length=30)

    def __str__(self):
        return f"{self.display_name} ({self.first_name} {self.last_name})"