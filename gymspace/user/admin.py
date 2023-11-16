from django.contrib import admin
from .models import UserProfile, UserPost, UserPostMedia

# Register your models here.

class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('username', "email", "trainer_status")
    search_fields = ['username', 'email', 'id']




class UserPostMediaInline(admin.TabularInline):
    model = UserPostMedia
    readonly_fiels = ('self.parent_post.title', 'media')

class UserPostAdmin(admin.ModelAdmin):
    model = UserPost
    inlines = (UserPostMediaInline,)
    search_fields = ['title', 'id',]


admin.site.register(UserProfile, UserProfileAdmin)
admin.site.register(UserPost, UserPostAdmin)
