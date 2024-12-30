from rest_framework.response import Response 
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.exceptions import NotFound
from django.shortcuts import get_object_or_404

from models.matchday import Matchday
from models.serializer import MatchdaySerializer, PlayerSerializer, MatchSerializer

class MatchdayView(APIView):
    def get(self, request):
        id = request.query_params.get('id', None)

        try:
            matchday = get_object_or_404(Matchday, id=id)
        except Matchday.DoesNotExist:
            raise NotFound(detail="Matchday not found.")
        
        serializer = MatchdaySerializer(matchday)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = MatchdaySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class MatchdayListView(APIView):
    def get(self, request):
        match = Matchday.objects.all()
        serializer = MatchdaySerializer(match, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class MatchdayPlayersView(APIView):
    def get(self, request, id):
        try:
            matchday = get_object_or_404(Matchday, id=id)
        except Matchday.DoesNotExist:
            raise NotFound(detail="Matchday not found.")
        
        players = matchday.players.all()
        serializer = PlayerSerializer(players, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class MatchdayMatchesView(APIView):
    def get(self, request, id):
        try:
            matchday = get_object_or_404(Matchday, id=id)
        except Matchday.DoesNotExist:
            raise NotFound(detail="Matchday not found.")
        
        matches = matchday.matches.all()
        serializer = MatchSerializer(matches, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class MatchdayCreateMatchesView(APIView):  
    def put(self, request, id):
        force = request.query_params.get('force', False)

        try:
            matchday = get_object_or_404(Matchday, id=id)
        except Matchday.DoesNotExist:
            raise NotFound(detail="Matchday not found.")
        
        if matchday.matches.count() > 0:
            if force == False:
                return Response({"failed" : "Matches were not created because they already exist. If you want to overwrite them use 'force' or add them manually."}, status=status.HTTP_200_OK)
            else:
                return Response({"failed" : "Matches were not created because 'force' is currently not implemented."}, status=status.HTTP_200_OK)
        else:
            matchday.generate_matches()
            return Response({"success" : "Matches were created."}, status=status.HTTP_200_OK)