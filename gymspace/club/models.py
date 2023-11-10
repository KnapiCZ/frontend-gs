from django.db import models
from gym.models import Gym, Sport
from django.contrib.auth.models import User
# Create your models here.


def club_upload_path(instance, filename):
    return f'media/global_gym_media/club-{instance.pk}/media/{filename}'


class Club(models.Model):
    parent_gym = models.ForeignKey(Gym, on_delete=models.CASCADE)
    target_sport = models.ForeignKey(Sport, on_delete=models.CASCADE)

    title = models.CharField(max_length=300)
    subtitle = models.CharField(max_length=150,
                                null=True, blank=True,)
    description = models.TextField(max_length=1000)

    logo = models.ImageField(upload_to=club_upload_path,
                             null=True,
                             blank=True
                             )
    main_image = models.ImageField(upload_to=club_upload_path,
                                   null=True,
                                   blank=True
                                   )

    members = models.ManyToManyField(User,
                                     blank=True,
                                     related_name='club_members',
                                     symmetrical=False)
    
    def save(self, *args, **kwargs):
        if self.pk is None:
            logo = self.logo
            main_image = self.main_image
            self.logo = None
            self.main_image = None
            super(Club, self).save(*args, **kwargs)
            self.logo = logo
            self.main_image = logo
        else:
            super(Club, self).save(*args, **kwargs)
    def __str__(self):
        return f'{self.title}'
