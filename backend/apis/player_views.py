from rest_framework.response import Response 
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.exceptions import NotFound
from django.shortcuts import get_object_or_404

from models.models import Player
from models.serializer import PlayerSerializer

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
    
class PlayerListView(APIView):
    def get(self, request):
        players = Player.objects.all()
        serializer = PlayerSerializer(players, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
