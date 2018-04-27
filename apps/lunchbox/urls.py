from django.conf.urls import url
from . import views     

urlpatterns = [
    url(r'^$', views.index),  
    url(r'^add/', views.add),
    url(r'^update/(?P<id>\d+)$',views.update),
    url(r'^uplaods/',views.uplaods),
    url(r'^(?P<id>\d+)$', views.show,name='bento-detail'),
    # url(r'^angular/(?P<id>\d+)$',views.showAn,name='bento-detail'),
    url(r'^next/',views.next),
    url(r'^getUser/',views.getUser),
    url(r'^addReview/',views.createReview),
    url(r'^tag/',views.tag),
    url(r'^addLike/(?P<id>\d+)$',views.addLike),
    url(r'^deleteReview/(?P<id>\d+)$',views.deleteReview),
]

