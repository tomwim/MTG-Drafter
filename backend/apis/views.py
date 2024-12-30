from rest_framework.response import Response 
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.exceptions import NotFound
from django.shortcuts import get_object_or_404

from models.models import *
from models.serializer import *

class PlayerListView(APIView):
    def get(self, request):
        players = Player.objects.all()
        serializer = PlayerSerializer(players, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class PersonListView(APIView):
    def get(self, request):
        persons = Person.objects.all()
        serializer = PersonSerializer(persons, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = PersonSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class PersonView(APIView):
    def get(self, request):
        id = request.query_params.get('id', None)

        try:
            person = get_object_or_404(Person, id=id)
        except Person.DoesNotExist:
            raise NotFound(detail="Person not found.")
        
        serializer = PersonSerializer(person)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = PersonSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class PlayerView(APIView):
    def get(self, request):
        id = request.query_params.get('id', None)

        try:
            person = get_object_or_404(Player, id=id)
        except Player.DoesNotExist:
            raise NotFound(detail="Player not found.")
        
        serializer = PlayerSerializer(person)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = PlayerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class MatchListView(APIView):
    def get(self, request):
        match = Match.objects.all()
        serializer = MatchSerializer(match, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class MatchView(APIView):
    def get(self, request):
        id = request.query_params.get('id', None)

        try:
            match = get_object_or_404(Match, id=id)
        except Match.DoesNotExist:
            raise NotFound(detail="Match not found.")
        
        serializer = MatchSerializer(match)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class MatchdayListView(APIView):
    def get(self, request):
        match = Matchday.objects.all()
        serializer = MatchdaySerializer(match, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class MatchdayView(APIView):
    def get(self, request):
        id = request.query_params.get('id', None)

        try:
            matchday = get_object_or_404(Matchday, id=id)
        except Matchday.DoesNotExist:
            raise NotFound(detail="Matchday not found.")
        
        serializer = MatchdaySerializer(matchday)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class MatchdayPlayersView(APIView):
    def get(self, request):
        id = request.query_params.get('id', None)

        try:
            matchday = get_object_or_404(Matchday, id=id)
        except Matchday.DoesNotExist:
            raise NotFound(detail="Matchday not found.")
        
        players = matchday.matchday.all()
        serializer = PlayerSerializer(players, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class MatchdayCreateMatchesView(APIView):  
    def put(self, request):
        id = request.query_params.get('id', None)
        force = request.query_params.get('force', False)

        try:
            matchday = get_object_or_404(Matchday, id=id)
        except Matchday.DoesNotExist:
            raise NotFound(detail="Matchday not found.")
        
        if matchday.matches.count > 0:
            if force == False:
                return Response({"not_created" : "Matches were not created because they already exist. If you want to overwrite them use 'force' or add them manually."}, status=status.HTTP_200_OK)
            # else:



