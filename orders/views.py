from django.http import HttpResponse
from django.template.loader import render_to_string
from django.shortcuts import render, redirect, get_object_or_404
from django.urls import reverse
from django.contrib.admin.views.decorators import staff_member_required
from django.conf import settings

from .models import OrderItem, Order
from .forms import OrderCreateForm
from cart.cart import Cart
from .tasks import order_created

import os
os.add_dll_directory(r"C:\Program Files\GTK3-Runtime Win64\bin")

import weasyprint


@staff_member_required
def admin_order_pdf(request, order_id):
    order = get_object_or_404(Order, id=order_id)
    html = render_to_string('orders/order/pdf.html',
                            {'order': order})
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = f'filename=order_{order.id}.pdf'
    weasyprint.HTML(string=html).write_pdf(response)

    return response


@staff_member_required
def admin_order_detail(request, order_id):
    order = get_object_or_404(Order, id=order_id)
    return render(request,
                  'admin/orders/order/detail.html',
                  {'order': order})


def order_create(request):
    cart = Cart(request)

    if request.method == 'POST':
        form = OrderCreateForm(request.POST)

        if form.is_valid():
            order = form.save(commit=False)

            if cart.coupon:
                order.coupon = cart.coupon
                order.discount = str(cart.coupon.discount)

            order.save()

            for item in cart:
                product = item['product']
                product.price = str(product.price)
                OrderItem.objects.create(order=order,
                                         product=product,
                                         price=str(item['price']),
                                         quantity=item['quantity'])

            #запустить асинхронное задание
            #order_created.delay(order.id)
            # задать заказ в сеансе
            request.session['order_id'] = str(order.id)
            cart.clear()
            # перенаправить к платежу
            return redirect(reverse('payment:process'))


    else:
        form = OrderCreateForm()

    return render(request,
                  'orders/order/create.html',
                  {"cart":cart, "form": form})
# Create your views here.
