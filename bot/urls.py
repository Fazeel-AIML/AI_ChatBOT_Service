from django.urls import path
from .views import index,about,contact,features,services,login,signup
from django.contrib.auth import views as auth_views
urlpatterns = [
    path('', index, name='index'),
    path('about/', about, name='about'),
    path('contact/', contact, name='contact'),
    path('features/', features, name='features'),
    path('signup/', signup, name='signup'),
    path('login/', auth_views.LoginView.as_view(template_name='login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('services/', services, name='services'),
]