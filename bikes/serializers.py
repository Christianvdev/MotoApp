from rest_framework import serializers
from .models import Bike, MaintenanceLog, PartService
from django.db.models import Max


class BikeSerializer(serializers.ModelSerializer):
    current_hours = serializers.SerializerMethodField()

    class Meta:
        model = Bike
        fields = "__all__"
        read_only_fields = ["user", "current_hours"]
    def get_current_hours(self, obj):
        return obj.maintenance_logs.aggregate(
            Max("hours")
        )["hours__max"] or 0

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
