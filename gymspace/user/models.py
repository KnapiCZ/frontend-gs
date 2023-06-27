from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=60, unique=True)
    
    goal = models.CharField(max_length=50)
    
    description = models.CharField(max_length=300)
    
    email = models.EmailField(max_length=254, unique=True)
    
    
    SEX_CHOICES = (
        ('M', 'Male'),
        ('F', "Female"),
        ('O', 'Other')
    )
    sex = models.CharField(max_length=1, choices=SEX_CHOICES)
    
    height = models.FloatField(null=True, blank=True)
    weight = models.FloatField(null=True, blank=True)
    
    trainer_status = models.BooleanField()
     