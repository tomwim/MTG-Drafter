from django.urls import path
from .person_views import *
from .player_views import *
from .match_views import *
from .matchday_views import *

app_name = 'apis'

urlpatterns = [
    path('players', PlayerListView.as_view(), name='players'),
    path('player', PlayerView.as_view(), name='player'),
    path('persons', PersonListView.as_view(), name='persons'),
    path('person', PersonView.as_view(), name='person'),
    path('matches', MatchListView.as_view(), name='matches'),
    path('match', MatchView.as_view(), name='match'),
    path('matchdays', MatchdayListView.as_view(), name='matchdays'),
    path('matchday', MatchdayView.as_view(), name='matchday'),
    path('matchday/players', MatchdayPlayersView.as_view(), name='matchday/players'),
    path('matchday-create-matches', MatchdayCreateMatchesView.as_view(), name='matchday-create-matches')
]