from django.shortcuts import render
#from django.views import generic
#from django.utils import timezone
from django.http import HttpResponse
# Create your views here.

def index(request):
    return HttpResponse('Hello World!')