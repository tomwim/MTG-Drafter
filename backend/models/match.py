from django.db import models
from django.contrib.postgres.fields import ArrayField

from .matchday import Matchday
from .player import Player

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