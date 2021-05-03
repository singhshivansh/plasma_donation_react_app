from django.db import models
from django.contrib.auth.models import User

import serpy
# Create your models here.
class PlasmaBank(models.Model):
    name = models.CharField(max_length=20)
    city = models.CharField(max_length=20)

class PlasmaBankSerializer(serpy.Serializer):
    name = serpy.StrField()
    city = serpy.StrField()