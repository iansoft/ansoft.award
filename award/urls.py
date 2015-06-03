from django.conf.urls import patterns, include, url
# from django.contrib import admin

urlpatterns = patterns('',
    url(r"^$", include('dashboard.urls')),
    url(r"^api/", include('dashboard.urls')),
)
