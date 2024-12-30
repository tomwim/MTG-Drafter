from django.contrib import admin

from .person import Person
from .player import Player
from .match import Match
from .matchday import Matchday

admin.site.register(Person)
admin.site.register(Player)
admin.site.register(Match)
admin.site.register(Matchday)
