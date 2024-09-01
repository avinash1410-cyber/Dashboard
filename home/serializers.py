# serializers.py
from rest_framework import serializers
from .models import EnergyOutlook

class SalesDataSerializer(serializers.Serializer):
    id = serializers.CharField()  # Converts ObjectId to string in MongoDB responses
    end_year = serializers.CharField(allow_blank=True, required=False)
    intensity = serializers.IntegerField()
    sector = serializers.CharField()
    topic = serializers.CharField()
    insight = serializers.CharField()
    url = serializers.URLField(allow_blank=True, required=False)
    region = serializers.CharField()
    start_year = serializers.CharField(allow_blank=True, required=False)
    impact = serializers.CharField(allow_blank=True, required=False)
    added = serializers.CharField()  # You might want to use DateTimeField if it's a date
    published = serializers.CharField()  # Same as above
    country = serializers.CharField()
    relevance = serializers.IntegerField()
    pestle = serializers.CharField()
    source = serializers.CharField()
    title = serializers.CharField()
    likelihood = serializers.IntegerField()

    # Optional: You can add validation methods if needed
    def validate_added(self, value):
        # Example: Validate that the 'added' field is a valid datetime string
        return value

    def validate_published(self, value):
        # Example: Validate that the 'published' field is a valid datetime string
        return value

class EnergyDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = EnergyOutlook
        fields = '__all__'  # Serializes all fields of the EnergyOutlook model
