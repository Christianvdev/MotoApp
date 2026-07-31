from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Bike(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    make = models.CharField(max_length=25)
    model_name = models.CharField(max_length=25)
    displacement = models.IntegerField(default=250)
    year = models.IntegerField(default=2027)
    tire_pressure = models.DecimalField(max_digits=4, decimal_places=1, default=12.5)

    def __str__(self):
        return f"{self.year} {self.make} {self.model_name}"


class MaintenanceLog(models.Model):
    bike = models.ForeignKey(
        Bike,
        on_delete=models.CASCADE,
        related_name="maintenance_logs"
    )

    date = models.DateField()
    hours = models.IntegerField()
    description = models.TextField()

    def __str__(self):
        return f"{self.date} - {self.bike} - {self.hours} hours"

class PartService(models.Model):
    bike = models.ForeignKey(
        Bike,
        on_delete=models.CASCADE
    )

    PART_CHOICES = [
        ("oil", "Oil"),
        ("air_filter", "Air Filter"),
        ("chain", "Chain"),
        ("sprockets", "Sprockets"),
        ("tires", "Tires"),
        ("brake_pads", "Brake Pads"),
    ]

    part_type = models.CharField(max_length=20, choices=PART_CHOICES)

    date = models.DateField()
    hours = models.IntegerField()
    description = models.TextField()

    def __str__(self):
        return f"{self.bike} - {self.get_part_type_display()} - {self.date}"