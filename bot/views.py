from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
@login_required
def index(request):
    return render(request, 'index.html')
@login_required
def about(request):
    return render(request, 'about.html')
@login_required
def contact(request):
    return render(request, 'contact.html')

def login(request):
    return render(request,"login.html")

def signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')
    else:
        form = UserCreationForm()
    return render(request, 'signup.html', {'form': form})
@login_required
def services(request):
    return render(request, "services.html")
@login_required
def features(request):
    return render(request,"features.html")