from django.db import models

# Create your models here.
from django.db import models
from django.core.validators import RegexValidator
from django.contrib.auth.models import AbstractUser


phone_regex = r'"^\\+?[1-9][0-9]{7,14}$"'
phone_validator = RegexValidator(
    regex=phone_regex,
    message="Phone number must be in this format: '+country_code-area_number-telephone_number'."
)

# Create your models here.


class CustomUser(AbstractUser):
    USER_TYPE_CHOICES = (
        ('admin', 'administer'),
        ('suscriber', 'suscriber'),
        ('publisher', 'publisher'),

    )
    username = models.CharField(max_length=30)

    email = models.EmailField(unique=True)

    user_type = models.CharField(
        max_length=20, choices=USER_TYPE_CHOICES, default='suscriber')

    phone = models.CharField(
        max_length=20,
        validators=[phone_validator]
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return str(self.username)
