from django.shortcuts import render, redirect
from django.shortcuts import render
from django.conf import settings
from django.core.files.storage import default_storage
from django.contrib import messages
import pyrebase
import os


config = {
    "apiKey": "AIzaSyBvAZBSuoCgvU2fQ57fKm_MrYq85ErpqDY",
    "authDomain": "gymspace-4b1e8.firebaseapp.com",
    "projectId": "gymspace-4b1e8",
    "storageBucket": "gymspace-4b1e8.firebasestorage.app",
    "messagingSenderId": "495660852412",
    "appId": "1:495660852412:web:a1b25c11bbfa0dec049cb9",
    "measurementId": "G-1S17N5B26W",
    "databaseURL": ""
};


firebase = pyrebase.initialize_app(config)
storage = firebase.storage()

def main(request):
    if request.method == 'POST':
        file = request.FILES['file']
        file_save = default_storage.save(file.name, file)
        storage.child("files/" + file.name).put("media/" + file.name)
        delete = default_storage.delete(file.name)
        messages.success(request, "File upload in Firebase Storage successful")
        return redirect('main')
    else:
        return render(request, 'main.html')