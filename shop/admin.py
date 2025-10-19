from django.contrib import admin
from django.urls import reverse
from .models import Category, Product
from django.http import HttpResponse
from parler.admin import TranslatableAdmin


@admin.register(Category)
class CategoryAdmin(TranslatableAdmin):
    list_display = ['name', 'slug']

    def get_prepopulated_fields(self, request, obj=None):
        return {'slug': ('name',)}


@admin.register(Product)
class ProductAdmin(TranslatableAdmin):
    list_display = ['name', 'slug', 'price',
                    'available', 'created', 'updated']
    list_filter = ['available', 'created', 'updated']
    list_editable = ['price', 'available']
    exclude = ['search_vector', 'search_vector_ru', 'search_vector_en']

    def get_prepopulated_fields(self, request, obj=None):
        return {'slug': ('name',)}

# Register your models here.
