"""
Django settings for core project.

Generated by 'django-admin startproject' using Django 4.2.3.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""
import os
import sys
from decouple import config
from pathlib import Path
from django.utils.translation import gettext_lazy  as _
from django.core.management.utils import get_random_secret_key
import dj_database_url

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
# BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
# CORE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECRET_KEY = config('SECRET_KEY')
SECRET_KEY = os.getenv('DJANGO_SECRET_KEY', get_random_secret_key())

# SECRET_KEY = 'django-insecure-!ng&=a646&z26l(lr0pywc@anl-+w$qu=&4+ol7@vqvgsj74aq'

# SECURITY WARNING: don't run with debug turned on in production!
# DEBUG = True
# DEBUG = config('DEBUG', default=False, cast=bool)

DEBUG = os.getenv('DEBUG', 'False') == 'True'

# ALLOWED_HOSTS = ['*']
ALLOWED_HOSTS = os.getenv('DJANGO_ALLOWED_HOSTS', '127.0.0.1, localhost', '159.223.243.74', 'geodigit.net', 'www.geodigit.net').split(',')


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.humanize',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'Gsite',
    'livereload',
    'htmx',
    'django_recaptcha',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.locale.LocaleMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'livereload.middleware.LiveReloadScript',
]

ROOT_URLCONF = 'core.urls'


POSTS_PER_PAGE = 3


TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'Gsite.views.category_list'
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'

DEVELOPMENT_MODE = os.getenv("DEFELOPMENT_MODE", 'False') == 'True'

if DEVELOPMENT_MODE is True:

    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        }
    }
elif len(sys.argv) > 0 and sys.argv[1] != 'collectstatic':
    if os.getenv("DATABASE_URL", None)is None:
        raise Exception("DATABASE_URL environment variable not defined")
    DATABASES = {
        "default": dj_database_url.parse(os.environ.get("DATABASE_URL")),
    }


AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


LANGUAGE_CODE = 'sr'

TIME_ZONE = 'Europe/Belgrade'

USE_I18N = True

USE_TZ = True

LANGUAGES = (
    ('sr', _('Serbian')),
    ('en', _('English')),
    # ('de', _('German')),
)

LOCALE_PATHS = [os.path.join(BASE_DIR, 'locale/')]

STATIC_URL = 'static/'


STATIC_ROOT = os.path.join(BASE_DIR, 'Gsite/', 'static')

# STATICFILES_DIRS = [
#     os.path.join(BASE_DIR, 'static'),
# ]
 


MEDIA_ROOT =  [os.path.join (BASE_DIR, 'media')]
MEDIA_URL = 'media/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

RECAPTCHA_PUBLIC_KEY=config('RECAPTCHA_PUBLIC_KEY')
RECAPTCHA_PRIVATE_KEY=config('RECAPTCHA_PRIVATE_KEY')

