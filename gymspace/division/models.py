from django.db import models
from gym.models import Gym, Sport
from django.contrib.auth.models import User
# Create your models here.


def division_upload_path(instance, filename):
    return f'media/global_gym_media/division-{instance.pk}/media/{filename}'


class Division(models.Model):
    parent_gym = models.ForeignKey(Gym, on_delete=models.CASCADE)
    target_sport = models.ForeignKey(Sport, on_delete=models.CASCADE)

    title = models.CharField(max_length=300)
    subtitle = models.CharField(max_length=150,
                                null=True, blank=True,)
    description = models.TextField(max_length=1000)

    logo = models.ImageField(upload_to=division_upload_path,
                             null=True,
                             blank=True
                             )
    main_image = models.ImageField(upload_to=division_upload_path,
                                   null=True,
                                   blank=True
                                   )

    members = models.ManyToManyField(User,
                                     blank=True,
                                     related_name='divison_members',
                                     symmetrical=False)
    
    def save(self, *args, **kwargs):
        if self.pk is None:
            logo = self.logo
            main_image = self.main_image
            self.logo = None
            self.main_image = None
            super(Division, self).save(*args, **kwargs)
            self.logo = logo
            self.main_image = logo
        else:
            super(Division, self).save(*args, **kwargs)
    def __str__(self):
        return f'{self.title}'
