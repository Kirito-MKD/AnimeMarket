import redis
from django.conf import settings
from .models import Product

# соеденение с redis
r = redis.Redis(
    host=settings.REDIS_HOST,
    port=settings.REDIS_PORT,
    db=settings.REDIS_DB
)

class Recommender:

    def get_product_key(self, id):
        return f'product: {id}:purchased_with'

    def products_bought(self, products):
        products_ids = [p.id for p in products]

        for products_id in products_ids:
            for with_id in products_ids:
                # получить другие товары, купленные
                # вместе с каждым товаром
                if products_id != with_id:
                    # увеличть балл товара
                    # купленного вместе
                    r.zincrby(
                        self.get_product_key(products_id),
                        1,
                        with_id
                    )

    def suggest_products(self, products, max_results=6):
        products_ids = [p.id for p in products]

        if not products_ids:
            return Product.objects.all()[:max_results]


        if len(products) == 1:
            suggestions = r.zrange(
                self.get_product_key(products_ids[0]),
                0, -1, desc=True)[:max_results]

        else:
            # сгенерировать временный ключ
            flat_ids = ''.join([str(id) for id in products_ids])
            tmp_key = f'tmp_{flat_ids}'

            # несколько товаров, объеденить баллы всех товаров
            # сохранить сортированное множество
            # во временном ключе
            keys = [self.get_product_key(id) for id in products_ids]
            r.zunionstore(tmp_key, keys)

            # удалить идентификаторы товаров по их количеству
            r.zrem(tmp_key, *products_ids)

            # получить идентификаторы товаров по их количеству
            # сортировать убыванию
            suggestions = r.zrange(tmp_key, 0, -1, desc=True)[:max_results]

            # удалить временный ключ
            r.delete(tmp_key)

        suggested_products_ids = [int(id) for id in suggestions]

        # получить предлагаемые товары и отсортировать их по порядку их появления
        suggested_products = list(Product.objects.filter(
            id__in=suggested_products_ids,
        ))
        suggested_products.sort(key=lambda x: suggested_products_ids.index(x.id))

        return suggested_products if suggested_products else Product.objects.filter(available=True)[:max_results]

    def clean_recommendations(self):

        for id in Product.objects.value_list('id', flat=True):
            r.delete(self.get_product_key(id))
