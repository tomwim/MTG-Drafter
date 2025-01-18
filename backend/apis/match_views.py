from rest_framework.response import Response 
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.exceptions import NotFound
from django.shortcuts import get_object_or_404

from models.match import Match
from models.serializer import MatchSerializer

class MatchView(APIView):
    def get(self, request):
        id = request.query_params.get('id', None)

        try:
            match = get_object_or_404(Match, id=id)
        except Match.DoesNotExist:
            raise NotFound(detail="Match not found.")
        
        serializer = MatchSerializer(match)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class MatchListView(APIView):
    def get(self, request):
        match = Match.objects.all()
        serializer = MatchSerializer(match, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class MatchScoreView(APIView):
    def put(self, request, id):
        score_player_one = request.query_params.get('score_player_one', None)
        score_player_two = request.query_params.get('score_player_two', None)

        try:
            match = get_object_or_404(Match, id=id)
        except Match.DoesNotExist:
            raise NotFound(detail="Match not found.")
        
        if str.isdigit(score_player_one) == False:
            return Response({
                "success" : False,
                "message" : "Score of player one is not a positive integer.",
                "match_id" : match.id
                }, status=status.HTTP_200_OK)
        
        if str.isdigit(score_player_two) == False:
            return Response({
                "success" : False,
                "message" : "Score of player two is not a positive integer.",
                "match_id" : match.id
                }, status=status.HTTP_200_OK)

        success, error_message = match.update_score(int(score_player_one), int(score_player_two))
        if success:
            return Response({
                "success" : True,
                "message" : f"Score was updated: {match.score_player_one} - {match.score_player_two}",
                "match_id" : match.id
                }, status=status.HTTP_200_OK)
        else:
            return Response({
                "success" : False,
                "message" : error_message,
                "match_id" : match.id
                }, status=status.HTTP_200_OK)
    
