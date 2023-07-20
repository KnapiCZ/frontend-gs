from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class UserProfile(models.Model):
    handle = models.OneToOneField(User, on_delete=models.CASCADE, unique=True)
    username = models.CharField(max_length=60)

    goal = models.CharField(max_length=50, blank=True)
    
    description = models.CharField(max_length=300, blank=True)
    
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
     
    def __str__(self):
        return self.username

    def get_handle(self):
        handle = User.objects.get(id=self.handle.id)
        return handle.username


    def filter_and_count(self, pk):
        return self.following.all().count()

class Follow(models.Model):
    following = models.ForeignKey(UserProfile, related_name="who_follows", on_delete=models.CASCADE)
    follower = models.ForeignKey(UserProfile, related_name="who_is_followed", on_delete=models.CASCADE)
    follow_time = models.DateTimeField(auto_now=True) 

    def __unicode__(self):
        return str(self.follow_time)

    def __str__(self):
        return f'{self.follower} follows {self.following}'

    def get_username(self):
        return self.username

