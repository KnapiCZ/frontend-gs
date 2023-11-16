from django.contrib import admin
from .models import Company
# Register your models here.

class CompanyAdmin(admin.ModelAdmin):
    model = Company
    search_fields = ['title', 'id',]

admin.site.register(Company, CompanyAdmin)
