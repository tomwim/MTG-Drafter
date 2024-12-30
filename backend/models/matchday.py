from django.db import models

MATCH_TYPES = {
    ("bo1", "Best of 1"),
    ("bo2", "Best of 2"),
    ("bo3", "Best of 3"),
    ("bo5", "Best of 5"),
}

match_types_dict = dict(MATCH_TYPES)

def get_game_count(match_type):
    if match_type in match_types_dict:
        match match_type:
            case "bo1":
                return 1
            case "bo2":
                return 2
            case "bo3":
                return 3
            case "bo5":
                return 5

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
    
    def get_game_count(self):
        return get_game_count(self.match_type)
    
    def generate_matches(self):
        print ("Generate")  
        from .match import Match
        players = self.players.all()
        for i, player in enumerate(players):
            opponents = players[i + 1:]
            for opponent in opponents:
                match = Match(match_day=self, player_one=player, player_two=opponent)
                match.save()
                print(f"Created {match.id} with {match.player_one.person.display_name} vs {match.player_two.person.display_name}")
