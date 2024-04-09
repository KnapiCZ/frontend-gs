from django.contrib import admin
from .models import Division
# Register your models here.

class DivisionAdmin(admin.ModelAdmin):
    model = Division
    search_fields = ['parent_gym__title', 'id', 'title', 'target_sport__title']

admin.site.register(Division, DivisionAdmin)
