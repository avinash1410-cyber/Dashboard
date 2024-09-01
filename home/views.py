from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from pymongo import MongoClient
from bson.objectid import ObjectId
from rest_framework.decorators import api_view
from collections import defaultdict
import urllib.parse





from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi




import urllib.parse
from pymongo import MongoClient

# Encode the username and password
username = urllib.parse.quote_plus("avi2501")
password = urllib.parse.quote_plus("Kumar2501")

# Construct the URI for MongoDB connection
uri = f"mongodb+srv://{username}:{password}@cluster0.g3chsud.mongodb.net/?retryWrites=true&w=majority&appname=Cluster0"

# Create a new client and connect to the server
client = MongoClient(uri)

# Iterate through each database
db=client['Demo']
collection = db['Demo']

class DashboardAPIView(APIView):
    def get(self, request):
        try:
            # Initialize filters
            filters = {}

            # Apply filters from query parameters
            if 'sector' in request.query_params:
                filters['sector'] = {"$regex": request.query_params.get('sector'), "$options": "i"}

            if 'region' in request.query_params:
                filters['region'] = {"$regex": request.query_params.get('region'), "$options": "i"}

            if 'topic' in request.query_params:
                filters['topic'] = {"$regex": request.query_params.get('topic'), "$options": "i"}

            if 'country' in request.query_params:
                filters['country'] = {"$regex": request.query_params.get('country'), "$options": "i"}

            # Fetch filtered data from MongoDB
            documents = list(collection.find(filters))

            # Initialize metrics
            total_items = len(documents)
            sum_intensity = 0
            sum_likelihood = 0

            # Metrics to find max values
            max_country = ""
            max_region = ""
            max_topic = ""
            max_sector = ""

            # Containers to find max values
            countries = defaultdict(int)
            regions = defaultdict(int)
            topics = defaultdict(int)
            sectors = defaultdict(int)

            for doc in documents:
                # Safely convert fields to the correct type
                intensity = doc.get('intensity', '0')
                likelihood = doc.get('likelihood', '0')

                # Convert strings to integers if necessary
                if isinstance(intensity, str):
                    try:
                        intensity = int(intensity)
                    except ValueError:
                        intensity = 0
                
                if isinstance(likelihood, str):
                    try:
                        likelihood = int(likelihood)
                    except ValueError:
                        likelihood = 0

                sum_intensity += intensity
                sum_likelihood += likelihood
                
                country = doc.get('country', '').strip()
                region = doc.get('region', '').strip()
                topic = doc.get('topic', '').strip()
                sector = doc.get('sector', '').strip()

                # Check if values are non-empty before counting
                if country:
                    countries[country] += 1
                if region:
                    regions[region] += 1
                if topic:
                    topics[topic] += 1
                if sector:
                    sectors[sector] += 1

            # Calculate averages
            average_intensity = sum_intensity / total_items if total_items > 0 else 0
            average_likelihood = sum_likelihood / total_items if total_items > 0 else 0

            # Find max values
            max_country = max(countries, key=countries.get, default="N/A")
            max_region = max(regions, key=regions.get, default="N/A")
            max_topic = max(topics, key=topics.get, default="N/A")
            max_sector = max(sectors, key=sectors.get, default="N/A")

            # Prepare response data
            dashboard_data = {
                "total_items": total_items,
                "average_intensity": average_intensity,
                "average_likelihood": average_likelihood,
                "max_country": max_country,
                "max_region": max_region,
                "max_topic": max_topic,
                "max_sector": max_sector
            }

            return Response(dashboard_data)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)






class SalesFilterAPIView(APIView):
    def get(self, request):
        try:
            filters = {}

            # Handle integer fields
            if 'intensity' in request.query_params:
                try:
                    filters['intensity'] = int(request.query_params.get('intensity'))
                except ValueError:
                    return Response({"error": "Invalid value for intensity"}, status=status.HTTP_400_BAD_REQUEST)

            if 'end_year' in request.query_params:
                try:
                    filters['end_year'] = int(request.query_params.get('end_year'))
                except ValueError:
                    return Response({"error": "Invalid value for end_year"}, status=status.HTTP_400_BAD_REQUEST)
            
            if 'start_year' in request.query_params:
                try:
                    filters['start_year'] = int(request.query_params.get('start_year'))
                except ValueError:
                    return Response({"error": "Invalid value for start_year"}, status=status.HTTP_400_BAD_REQUEST)

            # Handle string fields with regex
            if 'topic' in request.query_params:
                try:
                    filters['topic'] = {"$regex": request.query_params.get('topic'), "$options": "i"}
                except Exception as e:
                    return Response({"error": f"Invalid value for topic: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

            if 'sector' in request.query_params:
                try:
                    filters['sector'] = {"$regex": request.query_params.get('sector'), "$options": "i"}
                except Exception as e:
                    return Response({"error": f"Invalid value for sector: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

            if 'region' in request.query_params:
                try:
                    filters['region'] = {"$regex": request.query_params.get('region'), "$options": "i"}
                except Exception as e:
                    return Response({"error": f"Invalid value for region: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

            if 'pestle' in request.query_params:
                try:
                    filters['pestle'] = {"$regex": request.query_params.get('pestle'), "$options": "i"}
                except Exception as e:
                    return Response({"error": f"Invalid value for pestle: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

            if 'source' in request.query_params:
                try:
                    filters['source'] = {"$regex": request.query_params.get('source'), "$options": "i"}
                except Exception as e:
                    return Response({"error": f"Invalid value for source: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

            if 'country' in request.query_params:
                try:
                    filters['country'] = {"$regex": request.query_params.get('country'), "$options": "i"}
                except Exception as e:
                    return Response({"error": f"Invalid value for country: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

            # Query MongoDB with the constructed filters
            try:
                search_results = collection.find(filters)
                sales_data = list(search_results)

                # Convert ObjectId to string for all documents
                for doc in sales_data:
                    doc['id'] = str(doc.pop('_id'))  # Convert '_id' to 'id'

                return Response(sales_data)
            except Exception as e:
                return Response({"error": f"Database query failed: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class SalesSearchAPIView(APIView):
    def get(self, request, query=None):
        try:
            if query:
                # Perform a search on the MongoDB collection
                search_results = collection.find({"title": {"$regex": query, "$options": "i"}})
                sales_data = list(search_results)
                
                # Convert ObjectId to string for all documents
                for doc in sales_data:
                    doc['id'] = str(doc.pop('_id'))  # Convert '_id' to 'id'

                return Response(sales_data)
            else:
                return Response({"error": "No search query provided"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class EnergyDataDetailView(APIView):
    def get(self, request, id=None):
        try:
            # Convert id to ObjectId
            obj_id = ObjectId(id)
            # Find the document in MongoDB
            document = collection.find_one({"_id": obj_id})
            
            if document:
                # Convert ObjectId to string for the response
                document['id'] = str(document.pop('_id'))  # Convert '_id' to 'id'
                return Response(document)
            else:
                return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)





@api_view(['GET'])
def sales_view(request):
    try:
        # Fetch data from MongoDB
        documents = collection.find()
        sales_data = list(documents)

        # Convert ObjectId to string for all documents
        for doc in sales_data:
            doc['id'] = str(doc.pop('_id'))  # Convert '_id' to 'id'

        # Return JSON response
        return Response(sales_data)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def available_filters_view(request):
    try:
        # Aggregate distinct values for each filter field
        countries = collection.distinct('country')
        regions = collection.distinct('region')
        end_years = collection.distinct('end_year')
        start_years = collection.distinct('start_year')
        sectors = collection.distinct('sector')

        filters = {
            "countries": countries,
            "regions": regions,
            "end_years": end_years,
            "start_years": start_years,
            "sectors": sectors
        }

        return Response(filters)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

