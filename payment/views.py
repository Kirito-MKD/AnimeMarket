from django.shortcuts import render
from django.conf import settings
from django.shortcuts import render, redirect, reverse, get_object_or_404
from decimal import Decimal
import stripe
from orders.models import Order
from cart.cart import Cart



# создать экземпляр Stripe

stripe.api_key = settings.STRIPE_SECRET_KEY
stripe.api_version = settings.STRIPE_API_VERSION


def payment_process(request):
    order_id = request.session.get('order_id', None)
    order = get_object_or_404(Order, id=order_id)

    if request.method == 'POST':
        success_url = request.build_absolute_uri(
            reverse("payment:completed", args=[order_id])
        )
        cancel_url = request.build_absolute_uri(
            reverse("payment:canceled")
        )

        # данные сеанса оформления платежа Stripe
        session_data = {
            'mode': 'payment',
            'client_reference_id': str(order.id),
            'success_url': success_url,
            'cancel_url': cancel_url,
            'line_items': []
        }

        # добавить товарные позиции заказа
        for item in order.items.all():
            session_data['line_items'].append(
                {
                    'price_data': {
                        'unit_amount': int(item.price * Decimal('100')),
                        'currency': 'usd',
                        'product_data': {
                            'name': item.product.name,
                        },

                    },
                    'quantity': str(item.quantity) ,
                 }
            )

        # купон Stripe
        if order.coupon:
            stripe_coupon = stripe.Coupon.create(
                name = order.coupon.code_name,
                percent_off=order.discount,
                duration='once'
            )
            # добавить купон
            session_data['discounts'] = [
                {
                    "coupon": stripe_coupon.id
                }
            ]

        # создать сеанса офрмления платежа Stripe
        session = stripe.checkout.Session.create(**session_data)
        # перенаправить к платежной форме Stripe
        return redirect(session.url, code=303)
    else:
        return render(request, 'payment/process.html', {'order': order})


def payment_completed(request, order_id):
    order = get_object_or_404(Order,
                              id=order_id)
    return render(request, 'payment/completed.html', {'order': order})


def payment_canceled(request):
    return render(request, 'payment/canceled.html')