from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from .models  import ContactMessage
from django.contrib import messages
@login_required(login_url='login')
def index(request):
    print(request.user)  # should show AnonymousUser if not logged in
    return render(request, 'index.html')
@login_required
def about(request):
    """
    Displays the about page which describes the AI Chatbot's features, 
    benefits and provides testimonials from satisfied customers.

    :param request: The request object
    :return: The rendered about.html template
    """
    return render(request, 'about.html')
@login_required
def contact(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message = request.POST.get('message')
        consent = request.POST.get('consent')
        if consent:
            ContactMessage.objects.create(
                name=name,
                email=email,
                subject=subject,
                message=message
            )
            messages.success(request,"Your message has been sent!")
            return redirect('contact')
        else:
            messages.error(request,"Please provide consent")
    return render(request, 'contact.html')

from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages

def signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Account created successfully. You can now log in.')
            return redirect('login')
    else:
        form = UserCreationForm()  # <-- This must be defined for GET requests

    return render(request, 'signup.html', {'form': form})

@login_required
def services(request):
    return render(request, "services.html")
@login_required
def features(request):
    return render(request,"features.html")