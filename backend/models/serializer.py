from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from .person import Person
from .player import Player
from .match import Match
from .matchday import Matchday

class PersonSerializer(ModelSerializer):
    class Meta:
        model = Person
        fields = ("id", "first_name", "last_name", "display_name")

class PlayerSerializer(ModelSerializer):
    class Meta:
        model = Player
        fields = ("id", "person", "has_to_play", "cannot_play", "match_day")

class MatchSerializer(ModelSerializer):
    class Meta:
        model = Match
        fields = "__all__"

class MatchdaySerializer(ModelSerializer):
    class Meta:
        model = Matchday
        fields = "__all__"


