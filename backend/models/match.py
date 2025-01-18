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
    player_one = models.ForeignKey(
        Player, 
        on_delete=models.CASCADE, 
        related_name='player_one'
    )
    player_two = models.ForeignKey(
        Player, 
        on_delete=models.CASCADE, 
        related_name='player_two'
    )
    score_player_one = models.PositiveIntegerField(
        default=0
    )
    score_player_two = models.PositiveIntegerField(
        default=0
    )

    def __str__(self):
        return f"Match {self.id} (Matchday {self.match_day.id}): {self.player_one.member.display_name} {self.score_player_one} - {self.score_player_two} {self.player_two.member.display_name}"
    
    def update_score(self, score_player_one : int, score_player_two : int):
        if score_player_one < 0 or score_player_two < 0:
            return False, f"Score cannot be less than 0."
        
        if score_player_one + score_player_two > self.match_day.get_game_count():
            return False, f"Match type is {self.match_day.match_type}. Accumulated score {score_player_one + score_player_two} is higher than {self.match_day.get_game_count()}."
        
        self.score_player_one = score_player_one
        self.score_player_two = score_player_two
        self.save()
        return True, ""

    class Meta:
        verbose_name = "Match"
        verbose_name_plural = "Matches"