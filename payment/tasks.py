from io import BytesIO
from celery import shared_task
import weasyprint
from django.template.loader import render_to_string
from django.core.mail import send_mail, EmailMessage
from django.conf import settings
from orders.models import Order


@shared_task
def payment_completed(order_id):
    """
    Задание по отправке уведомлений по электронной почте
    при успешной оплате заказа
    """
    order = Order.objects.get(id=order_id)
    subject = f'Ваш заказ №{order.id} оформлен | Чек прилагается'
    message = f"""
    Уважаемый(ая) {order.first_name} {order.last_name},

    Благодарим вас за покупку в Aincrad Shop! Ваш заказ №{order.id} успешно оформлен и ожидает обработки.

    Детали заказа:

    Номер заказа: {order.id }

    Дата оформления: {order.created.strftime('%d-%m-%y %H:%m')}

    Сумма к оплате: {float(order.get_total_cost())} COL

    Статус оплаты: { 'Оплачено ✅' if order.paid else '⏳ Ожидает оплаты'}
    """

    email = EmailMessage(subject,
                         message,
                         "admin@myshop.com",
                         [order.email])

    html = render_to_string('orders/order/pdf.html', {"order": order})
    out = BytesIO()
    weasyprint.HTML(string=html).write_pdf(out)
    email.attach(f'order_{order.id}.pdf',
                 out.getvalue(),
                 'application/pdf')

    return email.send(fail_silently=False)