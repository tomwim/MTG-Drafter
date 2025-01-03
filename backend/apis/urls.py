from django.urls import path

from .member_views import *
from .player_views import *
from .match_views import *
from .matchday_views import *

app_name = 'apis'

urlpatterns = [
    path('players', PlayerListView.as_view(), name='players'),
    path('players', PlayerCreateView.as_view(), name='player'),
    path('players/<int:id>', PlayerView.as_view(), name='player'),

    path('members', MemberListView.as_view(), name='members'),
    path('members', MemberCreateView.as_view(), name='member-create'),
    path('members/<int:id>', MemberView.as_view(), name='member'),

    path('matches', MatchListView.as_view(), name='matches'),
    path('match', MatchView.as_view(), name='match'),
    path('match/<int:id>/score', MatchScoreView.as_view(), name='match-score'),

    path('matchdays', MatchdayListView.as_view(), name='matchdays'),
    path('matchdays/<int:id>', MatchdayView.as_view(), name='matchday'),
    path('matchdays/<int:id>/players', MatchdayPlayersView.as_view(), name='matchday-players'),
    path('matchdays/<int:id>/matches', MatchdayMatchesView.as_view(), name='matchday-matches'),
    path('matchdays/<int:id>/create-matches', MatchdayCreateMatchesView.as_view(), name='create-matches')
]