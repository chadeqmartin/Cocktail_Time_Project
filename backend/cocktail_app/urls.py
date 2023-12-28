from django.urls import path
from .views import CocktailView

urlpatterns = [
    path("", CocktailView.as_view()),
    path("<str:name>/", CocktailView.as_view())
]
