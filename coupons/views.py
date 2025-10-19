import django.forms
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.utils import timezone
from django.views.decorators.http import require_POST

from .models import Coupon
from .forms import CouponApplyForm


@require_POST
def coupon_apply(request):
    now = timezone.now()
    print("Coupons use")
    print(request.POST)
    form: django.forms.Form = CouponApplyForm(request.POST)

    if form.is_valid():
        code = form.cleaned_data['code']

        try:
            coupon = Coupon.objects.get(code__iexact=code,
                                        valid_from__lte=now,
                                        valid_to__gte=now,
                                        active=True)
            request.session['coupon_id'] = coupon.id
        except Coupon.DoesNotExist:
            request.session['coupon_id'] = None
            return JsonResponse({'success': False})

    return JsonResponse({'success': True})


def coupon_remove(request):
    request.session['coupon_id'] = ""
    return redirect('cart:cart_detail')