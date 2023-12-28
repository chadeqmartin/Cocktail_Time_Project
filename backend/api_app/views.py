from django.shortcuts import render
from user_app.views import UserPermissions
import requests
from rest_framework.response import Response
from cocktail_proj.settings import env
from googleapiclient.discovery import build

# Create your views here.
class Cocktail_by_Name(UserPermissions):
    def get(self, request, name):
        KEY = env.get("COCKTAIL_API_KEY")
        endpoint = f'https://www.thecocktaildb.com/api/json/v2/{KEY}/search.php?s={name}'
        response = requests.get(endpoint)
        responseJSON = response.json()
        return Response(responseJSON)
    
class Cocktail_by_ID(UserPermissions):
    def get(self, request, id):
        KEY = env.get("COCKTAIL_API_KEY")
        endpoint = f'https://www.thecocktaildb.com/api/json/v2/{KEY}/lookup.php?i={id}'
        response = requests.get(endpoint)
        responseJSON = response.json()
        return Response(responseJSON)
    
class Cocktail_by_Ingredient(UserPermissions):
    def get(self, request, ingredient):
        KEY = env.get("COCKTAIL_API_KEY")
        endpoint = f'https://www.thecocktaildb.com/api/json/v2/{KEY}/filter.php?i={ingredient}'
        response = requests.get(endpoint)
        responseJSON = response.json()
        return Response(responseJSON)
    
class Video(UserPermissions):
    def get(self, request, name):

        url = "https://youtube-data8.p.rapidapi.com/search/"

        querystring = {"q": f"{name} cocktail",
                       "hl":"en",
                       "gl":"US"}

        headers = {
	        "X-RapidAPI-Key": env.get("YT_API_KEY"),
	        "X-RapidAPI-Host": "youtube-data8.p.rapidapi.com"
        }

        response = requests.get(url, headers=headers, params=querystring)
        responseJSON = response.json()
        return Response(responseJSON)      