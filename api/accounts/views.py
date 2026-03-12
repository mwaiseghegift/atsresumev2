
from django.contrib.auth import authenticate, login, logout
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


# Import serializers from local file
from .serializers import RegisterSerializer, UserSerializer

# Views
class RegisterView(APIView):
	def post(self, request):
		serializer = RegisterSerializer(data=request.data)
		if serializer.is_valid():
			user = serializer.save()
			return Response({'success': True, 'user': UserSerializer(user).data}, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
	def post(self, request):
		username = request.data.get('username')
		password = request.data.get('password')
		user = authenticate(request, username=username, password=password)
		if user is not None:
			login(request, user)
			return Response({'success': True, 'user': UserSerializer(user).data})
		return Response({'success': False, 'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(APIView):
	permission_classes = [IsAuthenticated]
	def post(self, request):
		logout(request)
		return Response({'success': True})

class UserDetailView(APIView):
	permission_classes = [IsAuthenticated]
	def get(self, request):
		return Response({'user': UserSerializer(request.user).data})
