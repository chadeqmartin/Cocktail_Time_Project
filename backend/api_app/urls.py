from django.urls import path
from .views import Cocktail_by_Name, Cocktail_by_ID, Cocktail_by_Ingredient, Video

urlpatterns = [
    path('<str:name>/', Cocktail_by_Name.as_view(), name="cocktail_name"),
    path('id/<str:id>/', Cocktail_by_ID.as_view(), name="cocktail_id"),
    path('ing/<str:ingredient>/', Cocktail_by_Ingredient.as_view(), name="ingredient"),
    path('vid/<str:name>/', Video.as_view(), name="cocktail_video")
]