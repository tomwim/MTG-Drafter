from django.contrib import admin
from .models import Person, Player, Match, Matchday

admin.site.register(Person)
admin.site.register(Player)
admin.site.register(Match)
admin.site.register(Matchday)
