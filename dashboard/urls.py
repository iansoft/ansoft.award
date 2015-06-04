from django.conf.urls import patterns,include,url
from dashboard import views

urlpatterns = patterns('',
                       url(r"^$", views.index, name="dashboard"),
                       url(r"^get_awards/$", views.get_awards, name="get_awards"),
                       url(r"^init_db/$", views.init_db, name="init_db"),
                       url(r"^reset/$", views.reset, name="reset"),
                       url(r"^record_selected_students/$", views.record_selected_students, name="record_selected_students"),
                    )