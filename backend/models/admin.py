from django.contrib import admin

from .member import Member
from .player import Player
from .match import Match
from .matchday import Matchday

admin.site.register(Member)
admin.site.register(Player)
admin.site.register(Match)
admin.site.register(Matchday)
