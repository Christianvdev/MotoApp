from django.urls import path
from .views import BikeDetailView, BikeListCreateView, LogListCreateView
urlpatterns = [
    path("bikes/", BikeListCreateView.as_view()), 
    path("bikes/<int:pk>/", BikeDetailView.as_view()),
    path("bikes/log/<int:pk>/", LogListCreateView.as_view())
]