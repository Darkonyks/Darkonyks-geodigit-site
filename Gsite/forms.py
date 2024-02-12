from django import forms
from .models import Comment, ContactMessage
from django.utils.translation import gettext_lazy as _
from django_recaptcha.fields import ReCaptchaField

class NewCommentForm(forms.ModelForm):
    captcha = ReCaptchaField()
    class Meta:
        model = Comment
        fields = ('name', 'email', 'content', 'captcha')
        labels = {
            'name': _('Name'),
            'email': _('Email'),
            'content': _('Content'),
        }
        widgets = {
            "name" : forms.TextInput(attrs={"class": "col-md-6"}),
            "email" : forms.TextInput(attrs={"class": "col-md-6"}),
            "content" : forms.Textarea(attrs={"class": "col-md-6"})
        }

class ContactForm(forms.ModelForm):
    captcha = ReCaptchaField()
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'message', 'captcha']
        labels = {
            'name': _('Name'),
            'email': _('Email'),
            'message': _('Message'),
        }