from django.urls import path
from . import views
from django.conf.urls import handler404

app_name = 'shop'

urlpatterns = [
    path('<slug:category_slug>/', views.product_list,
         name='product_list_by_category'),
    path('<int:id>/<slug:slug>/', views.product_detail,
         name='product_detail'),
    path("products/list/", views.product_list, name='product_list'),
    path("", views.main_page, name='main_page'),
]

handler404 = 'shop.views.error_404_view'