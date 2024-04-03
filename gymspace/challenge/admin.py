from django.contrib import admin

# Register your models here.

from django.contrib import admin
from .models import Challenge, MemberProgress
# Register your models here.



class ChallengeAdmin(admin.ModelAdmin):
    model = Challenge
    search_fields = ['title', 'id']

class MemberProgressAdmin(admin.ModelAdmin):
    model = MemberProgress
    search_fields = ['user', 'challenge']
admin.site.register(Challenge, ChallengeAdmin)

admin.site.register(MemberProgress, MemberProgressAdmin)
