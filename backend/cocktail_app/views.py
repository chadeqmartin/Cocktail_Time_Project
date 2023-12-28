from django.shortcuts import render
from rest_framework.response import Response
from user_app.views import UserPermissions
from .serializers import CocktailSerializer, Cocktail
from favorite_app.models import Favorite

from rest_framework.status import HTTP_201_CREATED, HTTP_200_OK, HTTP_400_BAD_REQUEST


# Create your views here.
class CocktailView(UserPermissions):
    def post(self, request):
        favorites, created = Favorite.objects.get_or_create(user_id=request.user)
        
        if Cocktail.objects.filter(name=request.data.get('strName'), favorites_list=favorites).exists():
            return Response('error, drink already exists', HTTP_400_BAD_REQUEST)
        else:
            new_cocktail = Cocktail.objects.create(cocktail_id=request.data.get("idDrink"),  name=request.data.get('strName'), favorites_list=favorites)
            if new_cocktail:
                # if request.notes:
                #     new_cocktail.notes = request.notes
                new_cocktail.save()
                return Response(f"Cocktail added to your list!", HTTP_201_CREATED) 
        return Response(f'Something went wrong', HTTP_400_BAD_REQUEST)    
    
    def delete(self, request, name):
        favorites = Favorite.objects.get(user_id=request.user)
        drink_to_delete = Cocktail.objects.get(name = name, favorites_list=favorites)
        drink_to_delete.delete()
        return Response("Drink was deleted", HTTP_200_OK)
    
    def put(self, request, name):
        favorites = Favorite.objects.get(user_id=request.user)
        cocktail_to_change = Cocktail.objects.get(name = name, favorites_list=favorites)

        ser_cocktail = CocktailSerializer(cocktail_to_change, notes=request.notes, partial = True)

        if ser_cocktail.is_valid():
            ser_cocktail.save()
            return Response('notes have been updated', status=HTTP_200_OK)




        
