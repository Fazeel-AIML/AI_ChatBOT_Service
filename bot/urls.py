from django.urls import path
from .views import index,about,contact,features,services,signup
from django.contrib.auth.views import LoginView, LogoutView
from . import views
from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import LogoutView

class CustomLogoutView(LogoutView):
    def get(self, request, *args, **kwargs):
        return self.post(request, *args, **kwargs)
urlpatterns = [
    path('login/', LoginView.as_view(template_name='login.html'), name='login'),
    path('logout/', LogoutView.as_view(next_page='login'), name='logout'),
    path('', login_required(views.index, login_url='login'), name='index'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
    path('signup/', views.signup, name='signup'),
    path('services/', views.services, name='services'),
    path('features/', views.features, name='features'),
]