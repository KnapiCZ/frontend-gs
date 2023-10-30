from django.db import models
from django.contrib.auth.models import User
from company.models import Company
# Create your models here.


def gym_upload_path(instance, filename):
    return f'media/global_gym_media/{instance.pk}/media/{filename}'


class Sport(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(max_length=600,
                                   null=True, blank=True,)

    def __str__(self):
        return f'{self.title}'


class Gym(models.Model):
    parent_company = models.ForeignKey(Company, on_delete=models.CASCADE)

    title = models.CharField(max_length=300)
    subtitle = models.CharField(max_length=150,
                                null=True, blank=True,)
    description = models.TextField(max_length=1000)

    logo = models.ImageField(upload_to=gym_upload_path)
    main_image = models.ImageField(upload_to=gym_upload_path)

    members = models.ManyToManyField(User,
                                     blank=True,
                                     related_name='gym_members',
                                     symmetrical=False)
    staff = models.ManyToManyField(User,
                                   blank=True,
                                   related_name='gym_staff',
                                   symmetrical=False)

    city = models.CharField(max_length=50)
    location = models.CharField(max_length=500)
    location_size = models.IntegerField(null=True, blank=True)

    supported_sports = models.ManyToManyField(Sport)

    def __str__(self):
        return f'{self.title}'
