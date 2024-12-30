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
    path('match/<int:id>/score', MatchScoreView.as_view(), name='match-score'),

    path('matchdays', MatchdayListView.as_view(), name='matchdays'),
    path('matchday', MatchdayView.as_view(), name='matchday'),
    path('matchday/<int:id>/players', MatchdayPlayersView.as_view(), name='matchday-players'),
    path('matchday/<int:id>/matches', MatchdayMatchesView.as_view(), name='matchday-matches'),
    path('matchday/<int:id>/create-matches', MatchdayCreateMatchesView.as_view(), name='create-matches')
]