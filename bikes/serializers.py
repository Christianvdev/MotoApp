from rest_framework import serializers
from .models import Bike, MaintenanceLog
class BikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bike
        fields = "__all__"
        read_only_fields = ["user"]

class MaintenanceLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = MaintenanceLog
        fields = "__all__"
        read_only_fields = ["bike"]
