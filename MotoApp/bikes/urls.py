from django.urls import path
from .views import BikeDetailView, BikeListCreateView
urlpatterns = [
    path("bikes/", BikeListCreateView.as_view()), 
    path("bikes/<int:pk>/", BikeDetailView.as_view())
]