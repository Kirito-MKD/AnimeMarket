from django.db import models
from django.db.models import Value
from django.urls import reverse
from parler.models import TranslatableModel, TranslatedFields
from django.contrib.postgres.indexes import GinIndex
from django.contrib.postgres.search import SearchVectorField

class Category(TranslatableModel):
    translations = TranslatedFields(
        name = models.CharField(max_length=200),
        slug = models.SlugField(max_length=200, unique=True)
    )
    icon = models.CharField(max_length=200, default='💫')
    photo = models.ImageField(upload_to='categories/%Y/%m/%d',
                              blank=True)

    class Meta:
        # ordering = ['name']
        #indexes = [
         #   models.Index(fields=['name']),
        # ]
        verbose_name = 'category'
        verbose_name_plural = 'categories'

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("shop:product_list_by_category",
                       args=[self.slug])


class Product(TranslatableModel):
    translations = TranslatedFields(
        name=models.CharField(max_length=200) ,
        slug=models.SlugField(max_length=200 , unique=True),
        description=models.TextField(blank=True)
    )

    category = models.ForeignKey(Category,
                                 related_name="products",
                                 on_delete=models.CASCADE)

    # search vectors
    search_vector = SearchVectorField(null=True)
    search_vector_ru = SearchVectorField(null=True)
    search_vector_en = SearchVectorField(null=True)

    image = models.ImageField(upload_to='products/%Y/%m/%d',
                              blank=True)

    price = models.DecimalField(max_digits=10,
                                decimal_places=2)
    available = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:

        indexes = [
            GinIndex(fields=[
                "search_vector", "search_vector_ru", "search_vector_en",
            ]),
            models.Index(fields=['-created'])
        ]

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("shop:product_detail",
                       args=[self.id, self.slug])

    def update_search_vector(self):
        # обновляем индекс поиска для английского языка
        description = product.safe_translation_getter('description' , language_code='en')
        name = product.safe_translation_getter('name' , language_code='en')
        product.search_vector = django.contrib.postgres.search.SearchVector(Value(name) ,
                                                                            Value(description) ,
                                                                            config='english')
        product.search_vector_en = django.contrib.postgres.search.SearchVector(Value(name) ,
                                                                               Value(description) ,
                                                                               config='english')

        # обновляем индекс для русского языка
        description = product.safe_translation_getter('description' , language_code='ru')
        name = product.safe_translation_getter('name' , language_code='ru')
        product.search_vector_ru = django.contrib.postgres.search.SearchVector(Value(name) ,
                                                                               Value(description) ,
                                                                               config='russian')

    def model_type(self):
        return 'Product'
