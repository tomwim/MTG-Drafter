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
        game_id = request.query_params.get('game_id', None)
        winner_id = request.query_params.get('winner_id', None)

        try:
            match = get_object_or_404(Match, id=id)
        except Match.DoesNotExist:
            raise NotFound(detail="Match not found.")

        success, error_message = match.update_score(int(game_id), int(winner_id))
        if success:
            return Response({"success" : "Score was updated."}, status=status.HTTP_200_OK)
        else:
            return Response({"failed" : error_message}, status=status.HTTP_200_OK)
    
