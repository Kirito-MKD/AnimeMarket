from django.db import models
from django.urls import reverse
from parler.models import TranslatableModel, TranslatedFields
from taggit.managers import TaggableManager
from django.utils.translation import gettext_lazy as _
from django.contrib.postgres.indexes import GinIndex
from django.contrib.postgres.search import SearchVectorField, SearchVector
from django.db.models import Value



STATUS_CHOICES = [
    ('UP', 'Upcoming'),
    ("ON", "Ongoing"),
    ("CO", "Completed")
]


class EventType(TranslatableModel):
    translations = TranslatedFields(
        name=models.CharField(max_length=200),
        slug=models.SlugField(max_length=200, unique=True)
    )

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("events:event_list_by_category", args=[self.slug])


class Event(TranslatableModel):
    translations = TranslatedFields(
        title = models.CharField(max_length=200, unique=True),
        slug = models.SlugField(max_length=200, unique=True),
        description=models.TextField(null=True),
        buttonText = models.CharField(max_length=40, default=_('Read more'))
    )
    category = models.ForeignKey(EventType,
                                 related_name="events",
                                 on_delete=models.CASCADE)
    tags = TaggableManager()

    start_event = models.DateTimeField(blank=False)
    finish_event = models.DateTimeField(blank=True, null=True)

    search_vector = SearchVectorField(null=True)
    search_vector_en = SearchVectorField(null=True)
    search_vector_ru = SearchVectorField(null=True)

    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="Upcoming")
    image = models.ImageField(blank=True)

    price = models.DecimalField(max_digits=5, decimal_places=2, default=-1)
    # -1 событие относиться к новости, поэтому графа с ценной не будет отображаться

    created = models.DateField(auto_now_add=True)
    active = models.BooleanField(default=False)


    class Meta:
        indexes = [GinIndex(fields=['search_vector', 'search_vector_en', 'search_vector_ru'])]

    def __str__(self):
        return self.title

    def model_type(self):
        return 'Event'

    def get_absolute_url(self):
        return reverse("events:event_detail",
                       args=[self.slug, self.created])

    def is_upcoming(self):
        return self.status == STATUS_CHOICES[0][0]

    def is_ongoing(self):
        return self.status == STATUS_CHOICES[1][0]

    def update_search_vector(self):

        name = self.safe_translation_getter('title', language_code='en')
        description = self.safe_translation_getter('description', language_code='en')

        self.search_vector_en = SearchVector(Value(name), Value(description), config='english')
        self.search_vector = SearchVector(Value(name), Value(description), config='english')

        name = self.safe_translation_getter('title', language_code='ru')
        description = self.safe_translation_getter('description', language_code='ru')
        self.search_vector_ru = SearchVector(Value(name), Value(description), config='russian')

        self.save()


class EventCoordination(TranslatableModel):
    event = models.ForeignKey(Event,
                                     related_name="coordinations",
                                     on_delete=models.CASCADE)
    translations = TranslatedFields(
        location_name = models.CharField(max_length=200)
    )
    long_position = models.DecimalField(max_digits=11 , decimal_places=6)
    lat_position = models.DecimalField(max_digits=11 , decimal_places=6)

    def __str__(self):
        return str(self.long_position) + "," + str(self.lat_position)
