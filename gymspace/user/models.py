from django.db import models
from django.contrib.auth.models import User
# Create your models here.


def media_upload_path(instance, filename):
    return f'global_post_media/{instance.handle.id}/media/{filename}'
def profile_upload_path(instance, filename):
    return f'global_profile_media/{instance.handle.id}/profile/{filename}'


class UserProfile(models.Model):
    handle = models.OneToOneField(User,
                                  on_delete=models.CASCADE,
                                  unique=True,
                                  related_name='user_profile')
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
    
    followers = models.ManyToManyField(User,
                                       blank=True,
                                       related_name='followers',
                                       symmetrical=False)
    
    profile_picture = models.ImageField(upload_to=profile_upload_path,
                                        null=True, blank=True)
    background_picture = models.ImageField(upload_to=profile_upload_path,
                                           null=True, blank=True)


    def __str__(self):
        return self.username

    def get_handle(self):
        handle = User.objects.get(id=self.handle.id)
        return handle.username

    def get_profile_picture_url(self):
        user = UserProfile.objects.get(id=self.id)
        return user.profile_picture.url
    def get_background_picture_url(self):
        user = UserProfile.objects.get(id=self.id)
        return user.background_picture.url

class UserPost(models.Model):
    author = models.ForeignKey(User,
                               on_delete=models.CASCADE,
                               related_name='posts')
    # priprava na DB gymu
    # gym = models.ForeignKey(Gym, on_delete=models.CASCADE, unique=True)

    body = models.CharField(max_length=600)
    likes = models.ManyToManyField(User,
                                   blank=True,
                                   symmetrical=False,
                                   related_name='likes')

    post_time = models.DateTimeField(auto_now_add=True)

class UserPostMedia(models.Model):
    parent_post = models.ForeignKey(UserPost,
                                    on_delete=models.CASCADE,
                                    related_name='media')
    media = models.FileField(upload_to=media_upload_path)




    
