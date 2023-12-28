from django.db import models
from user_app.models import User
# from cocktail_app import Cocktail

class Favorite(models.Model):
    user_id = models.OneToOneField(User, on_delete=models.CASCADE)
   
# class Favorite_cocktail(models.Model):
#     favorites = models.ForeignKey(Favorite, on_delete=models.CASCADE)
#     cocktail = models.OneToOneField(Cocktail, on_delete=models.CASCADE)
#     notes = models.OneToOneField(User, on_delete=models.CASCADE)
