from rest_framework.response import Response 
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.exceptions import NotFound
from django.shortcuts import get_object_or_404

from models.member import Member
from models.serializer import MemberSerializer

class MemberView(APIView):
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
    
