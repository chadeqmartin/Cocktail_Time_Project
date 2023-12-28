from rest_framework import serializers
from .models import Favorite

class FavoriteSerializer(serializers.ModelSerializer):
    cocktails = serializers.SerializerMethodField()
    
    class Meta:
        model = Favorite
        fields = ['user_id', 'cocktails']

    def get_cocktails(self, instance):
        cocktails = instance.cocktails.all()
        return cocktails
    

