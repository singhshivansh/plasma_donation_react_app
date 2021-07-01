from django.shortcuts import render
from django.shortcuts import render
from django.shortcuts import HttpResponse, render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.views import View
from django.http import JsonResponse, request

import json

# importing from rest framework
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions, authentication

#importing models
from .models import PlasmaBank, Hospital, Donor


# importing the serializers
from .serializers import UserSerializer, DonorSerializer, PlasmaBankSerializer, HospitalSerializer

from django.views.decorators.csrf import csrf_exempt
# Create your views here.



class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class DonorView(APIView):
    authentication_classes  = [authentication.TokenAuthentication]
    permission_classes      = [permissions.IsAuthenticated]

    def get(self, request):
        print(request.user)
        donors = Donor.objects.all()
        donors = DonorSerializer(donors, many=True).data
        return Response(donors)

class RegisterView(APIView):
    def post(self, request):
        data = json.loads(request.body)
        print(data)
        if (data['reg_no'] and data['name'] and data['password_1'] and data['city'] and data['state']):
            if data['registering_to'] == 'plasma_bank':
                try:
                    if data['password_1'] != data['password_2']:
                        return JsonResponse({"error" : "Passwords Not Matching"})
                    user = User.objects.create_user(username = data['reg_no'], first_name = data['name'], password = data['password_1'])
                    PlasmaBank.objects.create(user = user, name=data['name'], city = data['city'], state=data['state'])
                    return Response({"msg" : "Plasma Bank successfully Created!"}, 201)
                except Exception as e:
                    return Response({"error" : e}, 404)
            elif data['registering_to'] == 'hospital':
                try:
                    if data['password_1'] != data['password_2']:
                        return JsonResponse({"error" : "Passwords Not Matching"})
                    user = User.objects.create_user(username = data['reg_no'], first_name = data['name'], password = data['password_1'])
                    Hospital.objects.create(user = user, name=data['name'], city = data['city'], state=data['state'])
                    return Response({"msg" : "Plasma Bank successfully Created!"}, 201)
                except Exception as e:
                    return Response({"error" : e}, 404)
            else:
                return Response({"error" : "Bad Request"}, 401)
        else:
            return Response({"error" : "Bad Request"}, 400)
        return Response({"msg" : "success"}, 200)
class Home(View):
    def get(self, request, *args, **kwargs):
        all_plasma = PlasmaBank.objects.all()
        plasma_json = PlasmaBankSerializer(all_plasma, many = True).data

        return JsonResponse({'data' : plasma_json})
    
class Get_User(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes      = [permissions.IsAuthenticated]
    def get(self, request):
        return Response(UserSerializer(request.user).data)

@csrf_exempt
def add_donor(request):
    if request.method == 'POST':
        try:
            msg = json.loads(request.body)
            donor_ins = Donor.objects.create(
                first_name  = msg['first_name'],
                last_name   = msg['last_name'],
                mobile      = msg['mobile'],
                blood_group = msg['blood_group'],
                email       = msg['email'],
                gender      = msg['gender'],
                weight      = msg['weight'],
                height      = msg['height'],
                city        = msg['city'],
                state       = msg['state']
            )

            return JsonResponse({"status" : "success", "donor_id" : donor_ins.id})
        except:
            return JsonResponse({"status" : "error"})

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

