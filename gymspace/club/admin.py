from django.contrib import admin
from .models import Club
# Register your models here.

class ClubAdmin(admin.ModelAdmin):
    model = Club
    search_fields = ['parent_gym__title', 'id', 'title', 'target_sport__title']

admin.site.register(Club, ClubAdmin)
