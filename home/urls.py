from django.urls import path
from . import views

urlpatterns = [
    path('', views.sales_view, name='sales_view'),
    path('api/search/<str:query>/', views.SalesSearchAPIView.as_view(), name='sales-search'),
    path('api/filter/', views.SalesFilterAPIView.as_view(), name='sales-filter'),
    path('api/get/<str:id>/', views.EnergyDataDetailView.as_view(), name='data-detail'),
    path('api/dashboard/', views.DashboardAPIView.as_view(), name='dashboard'),
    path('api/available-filters/', views.available_filters_view, name='available_filters_view'),
]
