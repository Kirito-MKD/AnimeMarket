from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_POST
from django.http import JsonResponse
from shop.models import Product
from shop.recommender import Recommender
from coupons.forms import CouponApplyForm
from .cart import Cart
from .forms import CartAddProductForm


@require_POST
def cart_add(request, product_id=None):
    cart = Cart(request)

    if not product_id:
        action = request.POST.get('action')
        product_id = request.POST.get('id')
        print(product_id)

        if action:
            product = get_object_or_404(Product , id=product_id)
            if action == "add_item" :
                quantity = int(request.POST.get('quantity')) + 1
                item_price = round(cart.add(product=product , quantity=quantity, override_quantity=True), 2)
            elif action == 'remove_item':
                quantity = int(request.POST.get('quantity')) - 1
                item_price = round(cart.add(product=product , quantity=quantity , override_quantity=True), 2)

            elif action == 'update_quantity':
                quantity = int(request.POST.get('quantity'))
                item_price = round(cart.add(product=product , quantity=quantity, override_quantity=True), 2)

            return JsonResponse({'status': 'ok' ,
                                 'total_price': round(cart.get_total_price() , 2) ,
                                 'discount': round(cart.get_discount() , 2) ,
                                 'final_price': round(cart.get_total_price_after_discount() , 2) ,
                                 'item_price': round(item_price, 2)})

        return JsonResponse({'status':'404'})

    product = get_object_or_404(Product, id=product_id)
    form = CartAddProductForm(request.POST)

    if form.is_valid():
        cd = form.cleaned_data
        cart.add(product=product, quantity=cd['quantity'], override_quantity=cd['override'])

    return redirect('cart:cart_detail')


@require_POST
def cart_minus(request, product_id):
    cart = Cart(request)
    product = get_object_or_404(Product , id=product_id)
    form = CartAddProductForm(request.POST)

    if form.is_valid():
        cd = form.cleaned_data
        cart.minus(product=product , quantity=cd['quantity'] , override_quantity=cd['override'])

    return redirect('cart:cart_detail')


@require_POST
def cart_remove(request, product_id):
    cart = Cart(request)
    product = get_object_or_404(Product, id=product_id)
    cart.remove(product)

    return redirect('cart:cart_detail')


def cart_detail(request):
    #TODO доделать переход на платежки, и рекомендуемые товары
    cart = Cart(request)
    for item in cart:
        item['update_quantity_from'] = CartAddProductForm(initial={
            'quantity': float(item['quantity']),
            'override': True,
        })

    coupon_apply_form = CouponApplyForm()

    r = Recommender()
    cart_products = [item['product'] for item in cart]

    if cart_products:
        recommended_products = r.suggest_products(
            cart_products,
            max_results=4
        )
    else:
        recommended_products = Product.objects.all()[:3]

    print(f"Recommends: {recommended_products}")
    return render(request, 'cart/detail.html',
                  {
                      "cart": cart,
                      'coupon_apply_form': coupon_apply_form,
                      'recommended_products': recommended_products
                  })
