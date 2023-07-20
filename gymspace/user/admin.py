from django.contrib import admin
from .models import UserProfile, Follow

# Register your models here.

class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('username', "email", "trainer_status")



admin.site.register(UserProfile, UserProfileAdmin)

admin.site.register(Follow)
