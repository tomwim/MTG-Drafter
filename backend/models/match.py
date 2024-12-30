from django.db import models
from django.contrib.postgres.fields import ArrayField

from models.matchday import Matchday
from models.player import Player

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
        return f"Match {self.id} (Matchday {self.match_day.id}): {self.player_one.person.display_name} {self.scores.count(1)} - {self.scores.count(2)} {self.player_two.person.display_name}"
    
    def update_score(self, game_id : int, winner_id : int):
        if not self.scores:
            self.scores = [0] * self.match_day.get_game_count()

        if game_id > self.match_day.get_game_count():
            return False, f"Match only has {self.match_day.get_game_count()} games."
        elif winner_id != self.player_one.id and winner_id != self.player_two.id and winner_id > 0:
            return False, f"Match winner is not part of the match."
        else:
            self.scores[game_id] = winner_id
            self.save()
            return True, ""

    class Meta:
        verbose_name = "Match"
        verbose_name_plural = "Matches"