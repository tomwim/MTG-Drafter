from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from .member import Member
from .player import Player
from .match import Match
from .matchday import Matchday

class MemberSerializer(ModelSerializer):
    class Meta:
        model = Member
        fields = "__all__"

class PlayerSerializer(ModelSerializer):
    member = MemberSerializer() 
    class Meta:
        model = Player
        fields = "__all__"

class MatchdaySerializer(ModelSerializer):
    class Meta:
        model = Matchday
        fields = "__all__"

class MatchdayWithPlayersSerializer(serializers.ModelSerializer):
    players = PlayerSerializer(many=True)  # List of players associated with this matchday

    class Meta:
        model = Matchday
        fields = ["id", "match_type", "set_id", "date", "players"]
    
    def create(self, validated_data):
        players_data = validated_data.pop('players', [])
        
        matchday = Matchday.objects.create(**validated_data)

        # Now manually create each player and associate it with the matchday
        for player_data in players_data:
            player_data["matchday"] = matchday
            Player.objects.create(**player_data)

        return matchday

class MatchSerializer(ModelSerializer):
    match_type = serializers.SerializerMethodField()
    class Meta:
        model = Match
        fields = "__all__"

    def get_match_type(self, obj):
        return obj.match_day.match_type if obj.match_day else None