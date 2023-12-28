from django.db import models
from favorite_app.models import Favorite
# Create your models here.
class Cocktail(models.Model):
    cocktail_id = models.CharField()
    name = models.CharField()
    notes = models.TextField(null=True)
    favorites_list = models.ForeignKey(Favorite, related_name="cocktails", on_delete=models.CASCADE)


