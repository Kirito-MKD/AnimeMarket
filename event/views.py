from django.shortcuts import render, get_object_or_404
from django.urls import path
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import Event, EventType


def event_detail(request, slug, created):
    language = request.LANGUAGE_CODE
    event = get_object_or_404(Event,
                              translations__language_code=language,
                              translations__slug=slug,
                              created=created)
    related_events = Event.objects.filter(active=True, tags__in=event.tags.all()).exclude(id=event.id)
    location = event.coordinations.get(event_id=event.id, translations__language_code=language)
    return render(request, 'event_detail.html', {'event': event, "location":location, 'related_events': related_events})


def events_list(request, category_slug=None):

    if category_slug:
        language = request.LANGUAGE_CODE
        category = get_object_or_404(EventType,
                                     translations__language_code=language,
                                     translations__slug=category_slug)
        events = Event.objects.filter(active=True, category=category).order_by('-created')
    else:
        category = None
        events = Event.objects.filter(active=True).order_by('-created')

    categories = EventType.objects.all()

    paginator = Paginator(events, 6)
    page_number = request.GET.get("page", 1)
    try:
        page_obj = paginator.get_page(page_number)
    except EmptyPage:
        page_obj = paginator.page(paginator.num_pages)
    except PageNotAnInteger:
        page_obj = paginator.page(1)
    return render(request, 'events_list.html', {'page': page_obj, 'categories': categories, 'category': category})