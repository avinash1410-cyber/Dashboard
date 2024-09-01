from django.contrib import admin
# Register your models here.
from .models import EnergyOutlook
class EnergyOutlookAdmin(admin.ModelAdmin):
    list_display = [field.name for field in EnergyOutlook._meta.fields]  # Specify the fields you want to display in the list view

admin.site.register(EnergyOutlook,EnergyOutlookAdmin)