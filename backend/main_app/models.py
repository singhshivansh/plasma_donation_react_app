from django.db import models
from django.contrib.auth.models import User

import serpy
# Create your models here.
class PlasmaBank(models.Model):
    user    = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    name    = models.CharField(max_length=20)
    city    = models.CharField(max_length=20)
    state   = models.CharField(max_length=20, null=True, blank=True)

class Hospital(models.Model):
    user    = models.OneToOneField(User, on_delete=models.CASCADE)
    name    = models.CharField(max_length=20)
    city    = models.CharField(max_length=20)
    state   = models.CharField(max_length=20, null=True, blank=True)

class Donor(models.Model):
    first_name  = models.CharField(max_length=30, null=True, blank=True)
    last_name   = models.CharField(max_length = 30, null=True, blank=True)
    mobile      = models.IntegerField(default=0)
    email       = models.CharField(max_length = 30, null=True, blank= True)
    age         = models.IntegerField(default=0)
    gender      = models.CharField(max_length=10, null=True, blank=True)
    blood_group = models.CharField(max_length=10, null=True, blank=True)
    weight      = models.IntegerField(default=0)
    height      = models.IntegerField(default=0)
    city        = models.CharField(max_length=50, null=True, blank=True)
    state       = models.CharField(max_length=30, null=True, blank=True)


class PlasmaBankSerializer(serpy.Serializer):
    name = serpy.StrField()
    city = serpy.StrField()