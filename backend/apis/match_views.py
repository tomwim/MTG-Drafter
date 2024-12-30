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
    
