from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from .models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from .serializers import UserSerializer
# from favorite_app.models import Favorite
# Create your views here.

class Sign_up(APIView):
    def post(self, request):
            data = request.data
            data['username'] = request.data.get('email')
            new_user = User.objects.create_user(**data)
            # Favorite.objects.create(user_id=new_user)
            if new_user is not None:
                new_token = Token.objects.create(user=new_user)
                login(request, new_user)
                return Response({"user": new_user.display_name, "token": new_token.key}, status=HTTP_201_CREATED)
            return Response("Something went wrong", status=HTTP_400_BAD_REQUEST)
            
class Log_in(APIView):
    def post(self, request):
            email = request.data['email']
            password = request.data["password"]
            user = authenticate(username=email, password=password)
            if user:
                token, created = Token.objects.get_or_create(user=user)
                return Response({"user": user.display_name, "token": token.key})
            return Response("Something went wrong creating a token", status=HTTP_404_NOT_FOUND)
        
class UserPermissions(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


class Info(UserPermissions):
    def get(self, request):
        user = UserSerializer(request.user)
        return Response(user.data)
    
    def put(self, request):
         user = request.user
         updated_user = UserSerializer(user, data=request.data, partial=True)
         if updated_user.is_valid():
              updated_user.save()
         return Response(updated_user.data, HTTP_204_NO_CONTENT)

class Log_out(UserPermissions):
    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=HTTP_204_NO_CONTENT)
    
class Delete_user(UserPermissions):
     
     def delete(self, request):
        user = request.user
        user.delete()
        return Response({"message": "Account deleted successfully"}, status=HTTP_204_NO_CONTENT)
