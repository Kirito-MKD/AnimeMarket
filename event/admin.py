from django.contrib import admin
from parler.admin import TranslatableAdmin,  TranslatableTabularInline
from .models import Event, EventType, EventCoordination


class InlineEventCoordinationAdmin(TranslatableTabularInline):
    model = EventCoordination
    extra = 2


@admin.register(EventType)
class EventTypeAdmin(TranslatableAdmin):
    list_display = ['name', 'slug']
    search_fields = ['name']

    def get_prepopulated_fields(self, request, obj=None):
        return {'slug': ('name',)}


@admin.register(Event)
class EventAdmin(TranslatableAdmin):
    list_display = ['title', 'slug', 'created', 'active']
    list_filter = ['created']
    search_fields = ['title']
    inlines = [InlineEventCoordinationAdmin]

    def get_prepopulated_fields(self, request, obj=None):
        return {'slug': ('title',)}
# Register your models here.
