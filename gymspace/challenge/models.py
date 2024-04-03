from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Challenge(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(max_length=50,
                                   null=True, blank=True,)
    goal = models.IntegerField()
    members = models.ManyToManyField(User,
                                     blank=True,
                                     related_name='challenge_members',
                                     symmetrical=False)
    def __str__(self):
        return f'{self.title}'


class MemberProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    challenge = models.ForeignKey(Challenge, on_delete=models.CASCADE)
    progress = models.IntegerField(default=0)
    completed = models.BooleanField(default=False)
    
    def __str__(self):
        return f'{self.user, self.challenge}'