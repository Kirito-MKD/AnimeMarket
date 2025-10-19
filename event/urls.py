from django.urls import path
from django.utils.translation import gettext_lazy as _
from . import views

app_name = 'events'

urlpatterns = [
    path('<slug:slug>/<str:created>', views.event_detail, name='event_detail'),
    path('<slug:category_slug>/', views.events_list, name='event_list_by_category'),
    path("", views.events_list, name='event_list')
]
