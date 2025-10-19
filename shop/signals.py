from django.db.models.signals import post_save
from django.dispatch import receiver
from shop.models import Product

@receiver(post_save, sender=Product)
def post_save_product(sender, instance, created, update_fields, **kwargs):
    instance.update_search_vector()