from django.test import TestCase, Client
from django.core.files.uploadedfile import SimpleUploadedFile
from django.contrib.messages import get_messages
from django.urls import reverse
from django.core.files.storage import default_storage
from firebase_storage.views import main  # Import your Firebase storage object if in views
import pyrebase


config = {
    "apiKey": "AIzaSyBvAZBSuoCgvU2fQ57fKm_MrYq85ErpqDY",
    "authDomain": "gymspace-4b1e8.firebaseapp.com",
    "projectId": "gymspace-4b1e8",
    "storageBucket": "gymspace-4b1e8.firebasestorage.app",
    "messagingSenderId": "495660852412",
    "appId": "1:495660852412:web:a1b25c11bbfa0dec049cb9",
    "measurementId": "G-1S17N5B26W",
    "databaseURL": ""
};


firebase = pyrebase.initialize_app(config)
storage = firebase.storage()


class FirebaseFileUploadTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.upload_url = reverse('main')

    def test_file_upload_to_firebase(self):
        # Create a dummy file to simulate an upload
        file_data = SimpleUploadedFile("test_file.txt", b"File content")

        # Save the file locally first, then upload it to Firebase
        file_save_path = default_storage.save(file_data.name, file_data)
        
        # Upload to Firebase
        try:
            storage.child("files/" + file_data.name).put("media/" + file_data.name)
            default_storage.delete(file_data.name)  # Clean up locally

            # Perform a POST request to trigger the view logic
            response = self.client.post(self.upload_url, {'file': file_data}, format='multipart')
            
            # Check if the redirect happened after success
            self.assertRedirects(response, self.upload_url)
            
            # Check if the success message was added
            messages = list(get_messages(response.wsgi_request))
            self.assertEqual(len(messages), 1)
            self.assertEqual(str(messages[0]), "File upload in Firebase Storage successful")
            
        finally:
            # Clean up Firebase storage if needed (optional)
            storage.child("files/" + file_data.name).delete()
