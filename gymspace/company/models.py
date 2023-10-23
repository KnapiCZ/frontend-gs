from django.db import models
from django.contrib.auth.models import User
# Create your models here.


def company_upload_path(instance, filename):
    return f'media/global_company_media/{instance.id}/media/{filename}'


class Company(models.Model):
    title = models.CharField(max_length=300)
    subtitle = models.CharField(max_length=150)
    description = models.TextField(max_length=1000)

    logo = models.ImageField(upload_to=company_upload_path)
    main_image = models.ImageField(upload_to=company_upload_path)

    staff = models.ManyToManyField(User,
                                   blank=True,
                                   related_name='company_staff',
                                   symmetrical=False)

    city = models.CharField(max_length=50)
    location = models.CharField(max_length=500)

    date_of_foundation = models.DateField(null=True, blank=True)

    def __str__(self):
        return f'{self.title}'
