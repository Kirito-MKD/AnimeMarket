from django.urls import path
from . import views

app_name = 'search'

urlpatterns = [
    path('get/', views.get_search, name='get'),
    path('', views.search, name='search'),
]