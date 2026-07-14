from rest_framework import generics
from .models import Bike
from .serializers import BikeSerializer
from rest_framework.permissions import IsAuthenticated

# Create your views here.


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