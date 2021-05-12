from django.db import models
from django.contrib.auth.models import User

import serpy
# Create your models here.
class PlasmaBank(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=20)
    city = models.CharField(max_length=20)

class Hospital(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=20)
    city = models.CharField(max_length=20)


class Donor(models.Model):
    name = models.CharField(max_length=30)
    city = models.CharField(max_length=50)

class PlasmaBankSerializer(serpy.Serializer):
    name = serpy.StrField()
    city = serpy.StrField()