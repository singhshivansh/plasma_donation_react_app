from django.shortcuts import render
from django.shortcuts import render
from django.shortcuts import HttpResponse, render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.views import View
from django.http import JsonResponse

import json
#importing models
from .models import PlasmaBank, PlasmaBankSerializer, Hospital

from rest_framework import viewsets

# importing the serializers
from .serializers import UserSerializer

from django.views.decorators.csrf import csrf_exempt
# Create your views here.



class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class Home(View):
    def get(self, request, *args, **kwargs):
        all_plasma = PlasmaBank.objects.all()
        plasma_json = PlasmaBankSerializer(all_plasma, many = True).data

        return JsonResponse({'data' : plasma_json})

@csrf_exempt
def register(request):
    msg = json.loads(request.body)
    user_ins = User.objects.create(username=msg['username'], first_name=msg['name'], password=msg['password'], email=msg['email'])

    if (msg['register_for'] == "Plasma_Bank"):
        try:
            PlasmaBank.objects.create(user=user_ins, name=msg['name'], city=msg['city'])
            msg = "Successfully Registered as Plasma Bank"
            return JsonResponse({"success" : msg})
        except:
            msg = "Something Went Wrong!"
            return JsonResponse({"error" : msg})

    if (msg['register_for'] == "Hospital"):
        try:
            Hospital.objects.create(user=user_ins, name=msg['name'], city=msg['city'])
            msg = "Successfully Registered as Hospital"
            return JsonResponse({"success" : msg})
        except:
            msg = "Something Went Wrong!"
            return JsonResponse({"error" : msg})
    msg = {"data" : msg}
    return JsonResponse(msg)

