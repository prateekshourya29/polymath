from django.db import models

# Create your models here.
from django.db import models

class UserModel(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    
    def __str__(self) -> str:
        return self.first_name
