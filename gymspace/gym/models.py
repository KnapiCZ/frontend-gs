from django.db import models
from django.contrib.auth.models import User
# Create your models here.
def gym_upload_path(instance, filename):
    return f'media/global_gym_media/{instance.id}/media/{filename}'

class Gym(models.Model):
    title = models.CharField(max_length=300)
    description = models.CharField(max_length=1000)

    logo = models.ImageField(upload_to=gym_upload_path)

    members = models.ManyToManyField(User,
                                     blank=True,
                                     related_name='members',
                                     symmetrical=False)
    def __str__(self):
        return f'{self.title[:50]}'
