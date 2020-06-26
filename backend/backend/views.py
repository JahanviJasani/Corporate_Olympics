from django.core.mail import send_mail
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings

class sendmail(APIView):
    def post(self, request):
        user = request.data
        subject = 'Corporate olympics - Contact Request: '+ user['company']
        message = 'Name: ' + user['name'] + '\nEmail: ' + user['email'] + '\nCompany: '+ user['company'] + '\nMessage: ' + user['message']
        email_from = settings.EMAIL_HOST_USER
        recipient_list = ['play@sportsmaidan.com']
        send_mail( subject, message, email_from, recipient_list )
        return Response('Done',200)

class sportssendmail(APIView):
    def post(self, request):
        user = request.data
        subject = 'Sports Maidan - Contact Request'
        message = 'Name: ' + user['name'] + '\nEmail: ' + user['email'] + '\nCompany: '+ user['phoneno'] + '\nMessage: ' + user['message']
        email_from = settings.EMAIL_HOST_USER
        recipient_list = ['play@sportsmaidan.com']
        send_mail( subject, message, email_from, recipient_list )
        return Response('Done',200)

        