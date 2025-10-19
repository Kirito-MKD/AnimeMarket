from django.urls import resolve

class NamespaceMiddleware:
    def __init__(self , get_response):
        self.get_response = get_response

    def __call__(self , request):
        # Добавляем namespace в request
        resolver_match = resolve(request.path_info)
        request.current_namespace = resolver_match.namespace
        request.current_url_name = resolver_match.url_name

        response = self.get_response(request)
        return response