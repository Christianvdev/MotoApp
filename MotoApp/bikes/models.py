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
