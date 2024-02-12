from django.conf import settings
from django.db.models import Count, Q
from django.shortcuts import render, get_object_or_404, HttpResponseRedirect, redirect
from django.urls import reverse
from django.core.paginator import EmptyPage, Paginator, PageNotAnInteger
from .models import Post, Category
from .forms import NewCommentForm, ContactForm
from django.http import HttpResponse
from datetime import datetime
from django.utils.translation import gettext_lazy as _
from django.utils.translation import get_language, activate, gettext 
from django.contrib import messages



def main(request, language_code=None):
    last_posts = Post.objects.filter(status='published').order_by('-publish')[:3].annotate(comment_count=Count('comments'))
    context = {
        'last_posts' : last_posts
    }

    template_name = 'home/main.html'

    if language_code:
        template_name = f'{language_code}/{template_name}'

    return render(request, template_name, context)


def about(request):

    exi_date_start = datetime(2011, 1, 31)
    wor_date_start = datetime(2002, 1, 31)
    current_date = datetime.now()
    existence = current_date.year - exi_date_start.year - ((current_date.month, current_date.day) < (exi_date_start.month, exi_date_start.day))
    working = current_date.year - wor_date_start.year - ((current_date.month, current_date.day) < (wor_date_start.month, wor_date_start.day))
    context = { "existence": existence , "working": working}
    return render(request, 'about/about.html', context)


def gis_services(request):
    return render(request, 'services/gis-services/gis-services.html')


def gis_development(request):
    return render(request, 'services/gis-development/gis-development.html')


def td_mapping(request):
    return render(request, 'services/3d-mapping/3d-mapping.html')


def surveying(request):
    return render(request, 'services/surveying/surveying.html')


def planning_design(request):
    return render(request, 'services/planning-design/planning-design.html')


def consulting(request):
    return render(request, 'services/consulting/consulting.html')


def references(request):
    return render(request, 'references/references.html')


def blog(request):
    all_posts = Post.objects.filter(status='published').order_by('-publish')
    popular_posts = Post.objects.order_by('-click_count')[:5]
    category_counts = Post.objects.filter(status='published').values('category__name').annotate(count=Count('category'))
    years = Post.objects.filter(status='published').dates('publish', 'year', order='DESC')

    paginator = Paginator(all_posts, 3)  

    page = int(request.GET.get('page', 1))

    if page:
        request.session['current_page'] = int(page)

    try:
        posts = paginator.get_page(page)
    except PageNotAnInteger:
        posts = paginator.get_page(1)
    except EmptyPage:
        posts = paginator.get_page(paginator.num_pages)

    context = {
        'category_counts': category_counts, 
        'posts': posts,
        'popular_posts': popular_posts,
        'has_previous_page': posts.has_previous(),
        'has_next_page': posts.has_next(),
        'years': years,
        }

    if request.META.get('HTTP_HX_REQUEST'):
        return render(request, 'blog/posts_partials.html', context, content_type='text/html; charset=utf-8')
    else:
        return render(request, 'blog/blog.html', context)

def blog_archive(request, year):
    posts = Post.objects.filter(status='published', publish__year=year).order_by('-publish')
    context = {'posts': posts, 'year': year}
    return render(request, 'blog/blog_archive.html', context)



def post_single(request, post):

    post = get_object_or_404(Post, slug=post, status="published")
    author_bio = post.author.authorprofile
    popular_posts = Post.objects.order_by('-click_count')[:5]
    category_counts = Post.objects.filter(status='published').values('category__name').annotate(count=Count('category'))
    years = Post.objects.filter(status='published').dates('publish', 'year', order='DESC')

    comments = post.comments.filter(status=True)
    user_comment = None

    category_url = reverse('blog_category', args=[post.category.name])

    previous_post = Post.objects.filter(pk__lt=post.pk, status="published").order_by('-pk').first()
    next_post = Post.objects.filter(pk__gt=post.pk, status="published").order_by('pk').first()

    if request.method == 'POST':
        comment_form = NewCommentForm(data=request.POST)
        if comment_form.is_valid():
            user_comment = comment_form.save(commit=False)
            user_comment.post = post
            user_comment.save()
            return HttpResponseRedirect(post.slug)
    else:
        comment_form = NewCommentForm()
    return render(
        request, 
        'blog/post_single.html', 
        {
            "post":post,
            "popular_posts":popular_posts,
            "author_bio": author_bio,
            "comments": user_comment,
            "comments": comments,
            "comment_form": comment_form,
            "category_counts": category_counts,
            "previous_post": previous_post,
            "next_post": next_post,
            "category_url" : category_url,
            "years": years
        }
    )


def cat_list_view(request, category):
    query = request.GET.get('q') 
    category_counts = Post.objects.filter(status='published').values('category__name').annotate(count=Count('category'))
    popular_posts = Post.objects.order_by('-click_count')[:5]
    queryset = Post.objects.filter(category__name=category, status="published")
    categories = Category.objects.all()
    years = Post.objects.filter(status='published').dates('publish', 'year', order='DESC')

    if query:
        queryset = queryset.filter(Q(title__icontains=query) | Q(content__icontains=query))

    context = {
        'catlist': queryset,
        'category_name': category,
        'query': query,
        'category_counts': category_counts,
        'popular_posts': popular_posts,
        'categories': categories,
        'years': years
    }

    return render(request, 'blog/blog_category.html', context)


def category_list(request):
    category_list = Category.objects.all()
    context = {
        "category_list": category_list
    }
    return context


def search_view(request):
    query = request.GET.get('q')

    if query:
        results = Post.objects.filter(Q(title__icontains=query) 
                | Q(content__icontains=query) 
                | Q(excerpt__icontains=query) 
                | Q(content_second__icontains=query) 
                | Q(content_final__icontains=query) & Q(status='published'))
        
    else:
        results = []

    result_count = results.count()

    context = {
        'results': results,
        'result_count': result_count,
    }

    if request.META.get('HTTP_HX_REQUEST'):
        return render(request, 'blog/search_results_fragment.html', context)
    else:
        return render(request, 'blog/blog.html', context)
    

def update_click_count(request, post_slug):
    post = Post.objects.filter(slug=post_slug).first()
    
    if post:
        post.click_count += 1
        post.save()
        return HttpResponseRedirect(reverse('post_single', args=[post_slug]))
    
    return HttpResponseRedirect('/')
    


def contact(request):
    
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            instance = form.save()
            messages.success(request, _('Message sent successfully!'))
            form.fields['name'].initial = ''
            form.fields['email'].initial = ''
            form.fields['message'].initial = ''
            return redirect('contact')
        else:
            return render(request, 'contact/contact.html', {'form': form})
    else:
        form = ContactForm()

    return render(request, 'contact/contact.html', {'form': form})


def translate(language):
    cur_language = get_language()
    try:
        activate(language)
        text = gettext('hello')
    finally:
        activate(cur_language)
    return text


def set_language(request):
    user_language = request.META.get('HTTP_ACCEPT_LANGUAGE', '').split(',')[0]

    for lang, _ in settings.LANGUAGES:
        if lang in user_language:
            activate(lang)
            request.LANGUAGE_CODE = lang

            if 'rs' in user_language.lower():
                request.LANGUAGE_CODE = 'sr'

            return HttpResponse("Language set to %s" % request.LANGUAGE_CODE)

    return HttpResponse("Language not recognized")