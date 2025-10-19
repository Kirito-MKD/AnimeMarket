import stripe
from django.conf import settings
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from orders.models import Order
from orders.tasks import payment_completed
from ..tasks import payment_completed as payment_completed_pdf


@csrf_exempt
def stripe_webhook(request):
    payload = request.body
    sig_hear = request.META['HTTP_STRIPE_SIGNATURE']
    event = None

    try:
        event = stripe.Webhook.construct_event(
            payload ,
            sig_hear ,
            settings.STRIPE_WEBHOOK_SECRET ,
        )
    except ValueError as e:
        # недопустимая полезная нагрузка
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError as e:
        # недопустимая подпись
        return HttpResponse(status=400)

    if event.type == 'checkout.session.completed':
        session = event.data.object

        if session.mode == 'payment' and session.payment_status == 'paid':
            try:
                order = Order.objects.get(id=session.client_reference_id)
            except Order.DoesNotExist:
                print(id)
                return HttpResponse(status=500)
                # пометить заказ как оплаченный
            order.paid = True
            # сохранить ИД платежа
            order.stripe_id = session.payment_intent  # new
            order.save()
            # запустить асинхронное задание
            payment_completed.delay(order.id)  # new

    return HttpResponse(status=200)