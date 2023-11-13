from django.db import models
from django.contrib.auth.models import User
from gym.models import Gym
# Create your models here.


def media_upload_path(instance, filename):
    return f'media/global_post_media/user-{instance.parent_post.author.pk}/media/{filename}'
def profile_upload_path(instance, filename):
    return f'media/global_profile_media/user-{instance.handle.pk}/profile/{filename}'

def followers(id):
    return UserProfile.objects.get(id=id).followers.count()
def following(id):
    return UserProfile.objects.filter(followers=id).count()

def likes(id):
    return UserPost.objects.get(id=id).likes.count()

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
                                       related_name='following',
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
    def count_followers(self):
        return followers(self.id)
    def count_following(self):
        return following(self.id)

    def get_posts(self):
        return UserPost.objects.filter(pk=self.pk).values_list('pk', flat=True)
    def get_posts_queryset(self):
        return UserPost.objects.filter(pk=self.pk).values_list('pk')
    def save(self, *args, **kwargs):
        if self.pk is None:
            profile_image = self.profile_picture
            background_image = self.background_picture
            self.profile_picture = None
            self.background_picture = None
            super(UserProfile, self).save(*args, **kwargs)
            self.profile_picture = profile_image
            self.background_picture = background_image
        else:
            super(UserProfile, self).save(*args, **kwargs)
class UserPost(models.Model):
    author = models.ForeignKey(User,
                               on_delete=models.CASCADE,
                               related_name='posts')
    gym = models.ForeignKey(Gym,
                            on_delete=models.CASCADE,
                            blank=True, null=True,)
    title = models.CharField(max_length=60,
                             blank=True,
                             null=True)

    body = models.CharField(max_length=600,
                            blank=True,
                            null=True
                            )
    likes = models.ManyToManyField(User,
                                   blank=True,
                                   symmetrical=False,
                                   related_name='likes')

    post_time = models.DateField(auto_now_add=True)

    def get_media(self):
        return UserPost.objects.filter(media__parent_post=self.id).values_list('media__media', flat=True)
    def count_likes(self):
        return likes(self.id)
    def __str__(self):
        return f"(user){self.author.user_profile.username} - (title){self.title} - (post id){self.id}"
class UserPostMedia(models.Model):
    parent_post = models.ForeignKey(UserPost,
                                    on_delete=models.CASCADE,
                                    related_name='media')
    media = models.FileField(upload_to=media_upload_path)
    def save(self, *args, **kwargs):
        if self.parent_post.pk is None:
            media = self.media
            self.media = None
            super(UserPostMedia, self).save(*args, **kwargs)
            self.media = media
        else:
            super(UserPostMedia, self).save(*args, **kwargs)
