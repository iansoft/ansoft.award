from django.conf.urls import patterns,include,url
from lab import views

urlpatterns = patterns('',
                       url(r"^$", views.index, name="lab"),
                       url(r"^post/$", views.post_info, name="post_info"),
                    )