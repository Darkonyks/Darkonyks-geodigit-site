from django.contrib import admin
from . import models

@admin.register(models.Post)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'publish', 'content', 'content_second', 'status', 'author', 'click_count')
    prepopulated_fields = {"slug": ("title",)}

@admin.register(models.Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('post', 'name', 'email', 'publish', 'status')
    list_filter = ('status', 'publish')
    search_fields = ('name', 'email', 'content')
    

admin.site.register(models.Category)
admin.site.register(models.AuthorProfile)
admin.site.register(models.ContactMessage)
