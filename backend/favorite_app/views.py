from user_app.views import UserPermissions
from django.shortcuts import render
from rest_framework.response import Response
from cocktail_app.serializers import CocktailSerializer, Cocktail
from rest_framework.status import HTTP_201_CREATED, HTTP_404_NOT_FOUND
from .models import Favorite

class FavoritesManager(UserPermissions):
    def get(self, request):
        myfavorites = Favorite.objects.get(user_id=request.user)
        mycocktails = Cocktail.objects.filter(favorites_list = myfavorites)
        ser_mycocktails = CocktailSerializer(mycocktails, many=True)
        return Response(ser_mycocktails.data, HTTP_201_CREATED)
    