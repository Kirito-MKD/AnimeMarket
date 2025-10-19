from django.shortcuts import render, get_object_or_404
from event.models import Event
from cart.forms import CartAddProductForm
from .recommender import Recommender
from .models import Category, Product


#TODO Доделать страницу detail.html добавить рекомендуемые товары


def main_page(request):
    news = Event.objects.order_by('-created').filter(active=True)[:10]
    categories = Category.objects.all()

    return render(request,
                  'shop/product/mainPage.html',
                  {'news': news,
                   'categories': categories}
                  )


def product_list(request, category_slug=None):
    category = None
    categories = Category.objects.all()
    products = Product.objects.filter(available=True)

    if category_slug:
        language = request.LANGUAGE_CODE
        category = get_object_or_404(Category,
                                     translations__language_code=language,
                                     translations__slug=category_slug)
        products = products.filter(category=category)

    return render(request,
                  "shop/product/list.html",
                  {'category': category,
                   'categories': categories,
                   'products': products})


def product_detail(request, id, slug):
    language = request.LANGUAGE_CODE
    product = get_object_or_404(Product,
                                id=id,
                                translations__language_code=language,
                                translations__slug=slug,
                                available=True)
    cart_product_form = CartAddProductForm()
    r = Recommender()
    recommended_products = r.suggest_products([product], 4)
    return render(request,
                  'shop/product/detail.html',
                  {
                      'product': product,
                      'cart_product_form': cart_product_form,
                      'recommended_products': recommended_products,
                   })


def error_404_view(request , exception=None):
    # we add the path to the 404.html file
    # here. The name of our HTML file is 404.html
    return render(request , 'shop/errors_templates/404.html')