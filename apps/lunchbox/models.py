# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from PIL import Image

from django.utils.encoding import iri_to_uri



# Create your models here.

class Category(models.Model):
    name=models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)
    def __unicode__(self):
       return self.name

class Tag(models.Model):
    name=models.CharField(max_length=255)
    category=models.ForeignKey(Category,related_name='tags')
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)
    def __unicode__(self):
       return self.name


class Lunchbox(models.Model):
    class Meta:
        ordering=['-updated_at']
    user = models.ForeignKey(User,related_name='lunchboxes')
    title = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    lon = models.FloatField(null=True)
    lat = models.FloatField(null=True)
    description = models.TextField(max_length = 500, blank=True)
    city = models.CharField(max_length=150,blank=True)
    ingredient = models.ManyToManyField(Tag,related_name='lunchboxes_ingredient')
    tags = models.ManyToManyField(Tag,related_name='lunchboxes')
    offertime = models.DateTimeField(null=True)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)
    public  = models.BooleanField(default = False)
    display  = models.BooleanField(default = True)
    like = models.IntegerField(default=0)   
    def __unicode__(self):
        return self.title
    def get_absolute_url(self):
        from django.urls import reverse
        return reverse('bento-detail',args=[str(self.id)])


class Step(models.Model):
    lunchbox = models.ForeignKey(Lunchbox,related_name='steps')
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)
    description = models.TextField(max_length = 500, blank=True)

def lunchbox_directory_path(instance,filename):
    print 'sbb'
    return 'Lunchbox/{0}/{1}/{2}'.format(instance.user.username,instance.lunchbox.title,filename)

class LunchboxImage(models.Model):
    user= models.ForeignKey(User,related_name='lunchboxImages')
    lunchbox= models.ForeignKey(Lunchbox,related_name='images')
    image=models.ImageField(upload_to=lunchbox_directory_path)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    def __unicode__(self):
        return iri_to_uri(self.image)
    


class Review(models.Model):
    user= models.ForeignKey(User,related_name='reviews')
    lunchbox= models.ForeignKey(Lunchbox,related_name='reviews')
    score = models.IntegerField(default=0)
    content = models.TextField(max_length = 500, blank=True)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)
    # class Meta:
    #     unique_together = ('user','lunchbox','score', 'content')
    #     ordering = ['created_at']
    # def __unicode__(self):
    #     return '%d: %s' % (self.created_at, self.content)






# @receiver(post_save,sender=Lunchbox)
# def create_steps(sender,instance,created,**kwargs):
#     if created:
#         Step.objects.create(lunchbox=instance)

# @receiver(post_save,sender=Lunchbox)       
# def create_images(sender,instance,created,**kwargs):
#     if created:
#         LunchboxImage.objects.create(lunchbox=instance,user=instance.user)