from django.db import models
from django.utils import timezone
from django.urls import reverse
from django.contrib.auth.models import User
# Create your models here.

def user_directory_path(instance, filename):
    return 'posts/{0}/{1}'.format(instance.id, filename)

class Category(models.Model):
    name = models.CharField(max_length=50)

    class Meta:
        verbose_name_plural = "categories"
    
    def __str__(self):
        return self.name


class AuthorProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField()
    image = models.ImageField(upload_to=user_directory_path, default='users/logo_f.png')

    def __str__(self):
        return self.user.username


class Post(models.Model):

    class NewManager(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status="published")
        
    options = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )

    title = models.CharField(max_length=250)
    category = models.ForeignKey(Category, on_delete=models.RESTRICT, default=1)
    slug = models.SlugField(max_length=250, unique_for_date='publish')
    image = models.ImageField(upload_to=user_directory_path, default='posts/default.jpg')
    publish = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blog_posts')
    content = models.TextField()
    excerpt = models.TextField(null=True)
    content_second = models.TextField(null=True)
    image_content = models.ImageField(upload_to=user_directory_path, blank=True, null=True)
    image_content_second = models.ImageField( upload_to=user_directory_path, blank=True, null=True)
    content_final = models.TextField(null=True)
    status = models.CharField(max_length=10, choices=options, default='draft')
    click_count = models.PositiveIntegerField(default=0, null=True)
    objects = models.Manager()
    newmanager = NewManager()

    def get_absolute_url(self):
        return reverse('post_single', args=[self.slug])

    class Meta:
        ordering = ('-publish',)

    def __str__(self):
        return self.title
    
class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    name = models.CharField(max_length=80)
    email = models.EmailField()
    content = models.TextField()
    publish = models.DateTimeField(default=timezone.now)
    status = models.BooleanField(default=True)
    image = models.ImageField(upload_to=user_directory_path, default='users/user.png')

    class Meta:
        ordering = ('publish',)

    def __str__(self):
        return f'Comment by {self.name}'


class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()

    def __str__(self):
        return self.name
