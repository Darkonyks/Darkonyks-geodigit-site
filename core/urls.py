from django.contrib import admin
from django.urls import path, include
from django.conf.urls.i18n import i18n_patterns

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('Gsite.urls')),
]

urlpatterns += i18n_patterns(
    path('', include('Gsite.urls')),
)
