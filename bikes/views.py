from rest_framework import generics
from .models import Bike, MaintenanceLog, PartService
from .serializers import BikeSerializer, MaintenanceLogSerializer, PartServiceSerializer
from rest_framework.permissions import IsAuthenticated

# Create your views here.

#-----BIKES-----

#create and view
class BikeListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = BikeSerializer

    def get_queryset(self):
        return Bike.objects.filter(
            user = self.request.user
        )
    def perform_create(self, serializer):
        serializer.save(
            user=self.request.user
        )

#delete
class BikeDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = BikeSerializer

    def get_queryset(self):
        return Bike.objects.filter(
            user = self.request.user
        )




#-----MAINTENANCE-LOG-----




# create and view logs
class LogListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = MaintenanceLogSerializer

    def get_queryset(self):
        return MaintenanceLog.objects.filter(
            bike__user=self.request.user,
            bike__pk=self.kwargs['pk']
        )

    def perform_create(self, serializer):
        bike = Bike.objects.get(pk=self.kwargs['pk'])
        serializer.save(bike=bike)


# delete logs
class LogDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = MaintenanceLogSerializer

    def get_queryset(self):
        return MaintenanceLog.objects.filter(
            bike__user=self.request.user
        )


#-----PARTS-LIST-----

class PartsListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PartServiceSerializer

    def get_queryset(self):
        bike_id = self.kwargs['pk']
        return PartService.objects.filter(bike_id=bike_id, bike__user=self.request.user)
    
    def perform_create(self, serializer):
        bike = Bike.objects.get(pk=self.kwargs['pk'], user=self.request.user)
        serializer.save(bike=bike)


class PartsDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PartServiceSerializer

    def get_queryset(self):
        return PartService.objects.filter(bike__user=self.request.user)