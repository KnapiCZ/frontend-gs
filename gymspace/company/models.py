from django.db import models
from django.contrib.auth.models import User
# Create your models here.


def company_upload_path(instance, filename):
    return f'media/global_company_media/{instance.id}/media/{filename}'


class Company(models.Model):
    title = models.CharField(max_length=300)
    subtitle = models.CharField(max_length=150,
                                null=True, blank=True,
                                )
    description = models.TextField(max_length=1000,
                                   null=True, blank=True,
                                   )

    logo = models.ImageField(upload_to=company_upload_path,
                             null=True, blank=True,)
    main_image = models.ImageField(upload_to=company_upload_path,
                                   null=True, blank=True,)

    staff = models.ManyToManyField(User,
                                   blank=True,
                                   related_name='company_staff',
                                   symmetrical=False)

    city = models.CharField(max_length=50)
    location = models.CharField(max_length=500)

    date_of_foundation = models.DateField(null=True, blank=True)

    administrator = models.CharField(max_length=150)
    ico = models.PositiveIntegerField()

    def __str__(self):
        return f'{self.title}'
