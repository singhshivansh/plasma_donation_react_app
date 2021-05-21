from django.contrib import admin

from .models import PlasmaBank, Donor, Hospital
# Register your models here.

admin.site.register(PlasmaBank)
admin.site.register(Hospital)
admin.site.register(Donor)