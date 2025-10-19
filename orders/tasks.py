import datetime

from celery import shared_task
from django.core.mail import send_mail
from .models import Order


@shared_task
def order_created(order_id):
    """
    Task to send an e-mail notification when an order is
    successfully created.
    """
    order = Order.objects.get(id=order_id)
    subject = f'Order nr. {order.id}'
    message = f'Dear {order.first_name},\n\n' \
              f'You have successfully placed an order.' \
              f'Your order ID is {order.id}.'
    mail_sent = send_mail(subject,
                          message,
                          'admin@myshop.com',
                          [order.email])
    return mail_sent


@shared_task
def payment_completed(order_id):
    """
    Task to send an e-mail notification when payment is
    successfully processed.
    """
    order = Order.objects.get(id=order_id)
    subject = f'✅ Payment confirmed | Order #{order.id} | Aincrad Shop'

    message = f"""
        **Dear {order.first_name},**
        
        Your payment has been successfully processed in the Aincrad banking system.
        
        ---
        
        ### 🛒 Order Details:
        **Order ID:** #{order.id}  
        **Date:** {datetime.datetime.now()}  
        **Total:** {order.get_total_cost()} CR  
        
        ### 📦 Delivery Information:
        **Shipping to:**  
        {order.address}  
        {order.postal_code}, {order.city}  
        
        ---
        
        ### 🔐 Next Steps:
        1. Your items are being prepared for shipment
        2. You'll receive another email with tracking details
        3. Expected delivery: 3-5 business days
        
        **Need help?** Contact our support team at support@aincrad-shop.com
        
        Thank you for shopping with us!  
        *The Aincrad Shop Team*  
        
        ![Aincrad Logo](https://aincrad-shop.com/static/images/logo.png)
        """

    html_message = f"""
        <html>
          <body style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #0a0e17; padding: 20px; border-left: 4px solid #64d8ff;">
              <h2 style="color: #64d8ff;">Dear {order.first_name},</h2>
              <p>Your payment has been successfully processed in the Aincrad banking system.</p>
        
              <hr style="border: 1px dashed #64d8ff;">
        
              <h3 style="color: #64d8ff;">🛒 Order Details</h3>
              <p><strong>Order ID:</strong> #{order.id}</p>
              <p><strong>Date:</strong> {order.created.strftime('%Y-%m-%d %H:%M')}</p>
              <p><strong>Total:</strong> {order.get_total_cost()} CR</p>
        
              <h3 style="color: #64d8ff;">📦 Delivery Information</h3>
              <p><strong>Shipping to:</strong><br>
              {order.address}<br>
              {order.postal_code}, {order.city}</p>
        
              <hr style="border: 1px dashed #64d8ff;">
        
              <h3 style="color: #64d8ff;">🔐 Next Steps</h3>
              <ol>
                <li>Your items are being prepared for shipment</li>
                <li>You'll receive another email with tracking details</li>
                <li>Expected delivery: 3-5 business days</li>
              </ol>
        
              <p><strong>Need help?</strong> Contact our support team at <a href="mailto:support@aincrad-shop.com">support@aincrad-shop.com</a></p>
        
              <p style="margin-top: 30px;">Thank you for shopping with us!<br>
              <em>The Aincrad Shop Team</em></p>
            </div>
          </body>
        </html>
        """

    mail_sent = send_mail(
        subject ,
        message ,
        'admin@myshop.com' ,
        [order.email,] ,
        html_message=html_message,
        fail_silently=False,
    )
    return mail_sent