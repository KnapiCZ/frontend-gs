from django.contrib import admin
from .models import Gym, Sport
# Register your models here.



class GymAdmin(admin.ModelAdmin):
    model = Gym
    search_fields = ['title', 'id', 'parent_company__title']

class SportAdmin(admin.ModelAdmin):
    model = Sport
    search_fields = ['title',]
admin.site.register(Gym, GymAdmin)

admin.site.register(Sport, SportAdmin)
