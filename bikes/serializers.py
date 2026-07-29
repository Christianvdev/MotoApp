from rest_framework import serializers
from .models import Bike, MaintenanceLog, PartService

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

class PartServiceSerializer(serializers.ModelSerializer):
    part_type_display = serializers.CharField(source='get_part_type_display', read_only=True)
                                              
    class Meta:
        model = PartService
        fields = "__all__"
        read_only_fields = ["bike"]
