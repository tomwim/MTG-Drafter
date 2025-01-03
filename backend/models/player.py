from django.db import models

from models.member import Member
from models.matchday import Matchday

COLORS = {
    ("w", "white"),
    ("u", "blue"),
    ("b", "black"),
    ("r", "red"),
    ("g", "green")
}

class Player(models.Model):
    member = models.ForeignKey(
        Member, 
        null=True,
        blank=True,
        on_delete=models.CASCADE
    )
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
        related_name="players",
        null=True,
        blank=True
    )

    def __str__(self):
        return f"{self.member.display_name} ({self.get_has_to_play_display()}, {self.get_cannot_play_display()})"

    def to_string(self):
        return f"{self.member.display_name} has to play {self.get_has_to_play_display()} and cannot play {self.get_cannot_play_display()}."