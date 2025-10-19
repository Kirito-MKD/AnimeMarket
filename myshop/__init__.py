from .celery import app as celery_app
import os

__all__ = ['celery_app']

# insert the GTK3 Runtime folder at the beginning
os.environ["WEASYPRINT_DLL_DIRECTORIES"] = r"C:\Program Files\GTK3-Runtime Win64\bin"
os.add_dll_directory(r"C:\Program Files\GTK3-Runtime Win64\bin")