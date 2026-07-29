from django.urls import path
from .views import BikeDetailView, BikeListCreateView, LogListCreateView, LogDetailView, PartsListCreateView, PartsDetailView
urlpatterns = [
    path("bikes/", BikeListCreateView.as_view()),

    path("bikes/<int:pk>/", BikeDetailView.as_view()),

    path("bikes/log/<int:pk>/", LogListCreateView.as_view()),

    path("bikes/log/detail/<int:pk>/", LogDetailView.as_view()),

    path("bikes/parts/<int:pk>/", PartsListCreateView.as_view()),
    
    path("bikes/parts/detail/<int:pk>/", PartsDetailView.as_view()),
    
]