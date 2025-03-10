from rest_framework.response import Response 
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.exceptions import NotFound
from rest_framework.permissions import AllowAny
from oauth2_provider.contrib.rest_framework import TokenHasScope
from django.shortcuts import get_object_or_404

from models.member import Member
from models.serializer import MemberSerializer

class MemberView(APIView):
    def get_permissions(self):
        # Restrict POST requests to users with the 'write' scope
        if self.request.method == 'PUT':
            return [TokenHasScope()]  # Use OAuth-based permission
        # Allow all users to make GET requests
        return [AllowAny()]
    
    def get(self, request, id):
        try:
            member = get_object_or_404(Member, id=id)
        except Member.DoesNotExist:
            raise NotFound(detail="Member not found.")
        
        serializer = MemberSerializer(member)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, id):
        try:
            member = get_object_or_404(Member, id=id)
        except Member.DoesNotExist:
            raise NotFound(detail="Player not found.")
        
        serializer = MemberSerializer(member, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class MemberCreateView(APIView):
    def post(self, request):
        serializer = MemberSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class MemberListView(APIView):
    def get(self, request):
        members = Member.objects.all()
        serializer = MemberSerializer(members, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
