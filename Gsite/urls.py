from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('',views.main, name='home'),
    path('about/',views.about, name='about'),
    path('references/',views.references, name='references'),
    path('services/gis-services/',views.gis_services, name='gis-services'),
    path('services/gis-development/',views.gis_development, name='gis-development'),
    path('services/3d-mapping/',views.td_mapping, name='3d-mapping'),
    path('services/surveying/',views.surveying, name='surveying'),
    path('services/planning-design/',views.planning_design, name='planning-design'),
    path('services/consulting/',views.consulting, name='consulting'),
    path('blog/',views.blog, name='blog'),
    path('blog/<slug:post>',views.post_single, name='post_single'),
    path('blog/category/<str:category>/',views.cat_list_view, name='blog_category'),
    path('blog/search/',views.search_view, name='search'),
    path('blog/update_click_count/<slug:post_slug>/', views.update_click_count, name='update_click_count'),
    path('blog/archive/<int:year>/', views.blog_archive, name='blog_archive'),
    path('contact/',views.contact, name='contact'),
    path('set_language/', views.set_language, name='set_language'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)