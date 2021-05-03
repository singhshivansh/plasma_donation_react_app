from django.shortcuts import render
from django.shortcuts import render
from django.shortcuts import HttpResponse, render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.views import View
from django.http import JsonResponse

#importing models
from .models import PlasmaBank, PlasmaBankSerializer
# Create your views here.

class Home(View):
    def get(self, request, *args, **kwargs):
        all_plasma = PlasmaBank.objects.all()
        plasma_json = PlasmaBankSerializer(all_plasma, many = True).data

        return JsonResponse({'data' : plasma_json})
