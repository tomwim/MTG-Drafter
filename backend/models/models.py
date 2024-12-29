from django.db import models
from django.contrib.postgres.fields import ArrayField

COLORS = {
    ("w", "white"),
    ("u", "blue"),
    ("b", "black"),
    ("r", "red"),
    ("g", "green")
}

MATCH_TYPES = {
    ("bo1", "Best of 1"),
    ("bo2", "Best of 2"),
    ("bo3", "Best of 3"),
    ("bo5", "Best of 5"),
}

# Create your models here.
class Person(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    display_name = models.CharField(max_length=30)

    def __str__(self):
        return f"{self.display_name} ({self.first_name} {self.last_name})"

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
        return f"Matchday {self.id}"# ({self.match_type})"

class Player(models.Model):
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    has_to_play = models.CharField(
        max_length=1,
        choices=COLORS,
        default="w",
    )
    cannot_play = models.CharField(
        max_length=1,
        choices=COLORS,
        default="w",
    )
    match_day = models.ForeignKey(
        Matchday, 
        on_delete=models.CASCADE, 
        related_name="matchday",
        null=True,
        blank=True
    )

    def __str__(self):
        return f"{self.person.first_name} {self.person.last_name} ({self.get_has_to_play_display()}, {self.get_cannot_play_display()})"

    def to_string(self):
        return f"{self.person.display_name} has to play {self.get_has_to_play_display()} and cannot play {self.get_cannot_play_display()}."

class Match(models.Model):    
    match_day = models.ForeignKey(
        Matchday, 
        on_delete=models.CASCADE, 
        related_name="matches",
        null=True,
        blank=True
    )
    player_one = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='player_one')
    player_two = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='player_two')
    scores = ArrayField(
        models.IntegerField(),
        default=list,
        blank=True
    )

    def __str__(self):
        return f"Match {self.id} (Matchday): {self.player_one.person.display_name} {self.scores.count(1)} - {self.scores.count(2)} {self.player_two.person.display_name}"

    class Meta:
        verbose_name = "Match"
        verbose_name_plural = "Matches"





