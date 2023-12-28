from django.urls import path
from .views import FavoritesManager
urlpatterns = [
    path("", FavoritesManager.as_view())
]

