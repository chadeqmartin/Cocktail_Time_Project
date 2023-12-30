from django.db import models
from user_app.models import User
# from cocktail_app import Cocktail

class Favorite(models.Model):
    user_id = models.OneToOneField(User, on_delete=models.CASCADE)
   

