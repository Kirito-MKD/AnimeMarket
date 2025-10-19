from django.db.models.signals import post_save
from django.dispatch import receiver
from event.models import Event


@receiver(post_save, sender=Event)
def update_search_vector(sender, instance, created, update_fields, **kwargs):
    instance.update_search_vector()