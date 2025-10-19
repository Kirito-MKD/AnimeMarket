from django.shortcuts import render
from django.db.models import Q
from django.http import JsonResponse
from shop.models import Product
from event.models import Event
from django.views.decorators.csrf import csrf_exempt

from itertools import chain
from operator import attrgetter

from search.utils import results_to_json


@csrf_exempt
def search(request, type_search='all'):
    language = request.LANGUAGE_CODE

    if request.POST:

        query = request.POST.get('search')
        type_search = request.POST.get("type_search") if request.POST.get("type_search") else type_search

        if type_search == 'products':
            result_list = Product.objects.language(language).filter(available=True).filter(
                                                    Q(**{f'search_vector_{language}__icontains': query})
                                                    | Q(**{'search_vector__icontains': query})
                                                    | Q(**{f'search_vector_{language}': query})
                                                    | Q(**{f'search_vector_{language}': query}))
        elif type_search == 'events':
            result_list = Event.objects.language(language).filter(active=True).filter(
                                                    Q(**{f'search_vector_{language}__icontains': query})
                                                    | Q(**{'search_vector__icontains': query})
                                                    | Q(**{f'search_vector_{language}': query})
                                                    | Q(**{f'search_vector_{language}': query}))
        else:
            products = Product.objects.language(language).filter(
                                                    Q(**{f'search_vector_{language}__icontains': query})
                                                    | Q(**{'search_vector__icontains': query})
                                                    | Q(**{f'search_vector_{language}': query})
                                                    | Q(**{f'search_vector_{language}': query}))
            events = Event.objects.language(language).filter(active=True).filter(
                                                    Q(**{f'search_vector_{language}__icontains': query})
                                                    | Q(**{'search_vector__icontains': query})
                                                    | Q(**{f'search_vector_{language}': query})
                                                    | Q(**{f'search_vector_{language}': query}))

            result_list = sorted(
                chain(products, events) ,
                key=attrgetter(f'search_vector_{language}') ,
                reverse=True ,
            )

        return render(request , 'search.html' , {'results':result_list, 'query': query,
                                                     'type_search': type_search})

    return render(request, 'search.html')


@csrf_exempt
def get_search(request):

    language = request.LANGUAGE_CODE
    result_list = []

    if request.POST.get('search'):
        query = request.POST.get('search')
        print(query)
        products = Product.objects.language(language).filter(available=True).filter(
                                                    Q(**{f'search_vector_{language}__icontains': query})
                                                    | Q(**{'search_vector__icontains': query})
                                                    | Q(**{f'search_vector_{language}': query})
                                                    | Q(**{f'search_vector_{language}': query}))[:3]
        events = Event.objects.language(language).filter(active=True).filter(
                                                    Q(**{f'search_vector_{language}__icontains': query})
                                                    | Q(**{'search_vector__icontains': query})
                                                    | Q(**{f'search_vector_{language}': query})
                                                    | Q(**{f'search_vector_{language}': query}))
        print(result_list)
        result_list = sorted(
            chain(products, events) ,
            key=attrgetter(f'search_vector_{language}'),
            reverse=True
        )
    result_list = results_to_json(result_list)
    return JsonResponse(result_list, safe=False)
