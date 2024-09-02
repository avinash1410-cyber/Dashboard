import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import Card from '../components/Card';
import Card2 from '../components/Card2';
import axios from 'axios';
import { Link } from 'react-router-dom';


function Home() {
  const [allData, setAllData] = useState({});
  const [latestArticle, setLatestArticle] = useState(null);
  const [example, setExample] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://dashboard-1-7drh.onrender.com/');
      const exampleData = Array.isArray(response.data) ? response.data.slice(0, 5) : [];
      setExample(exampleData);

      const latestArticleData = Array.isArray(response.data) ? response.data[response.data.length - 1] : null;
      setLatestArticle(latestArticleData);

    } catch (error) {
      console.error('Error fetching all data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://dashboard-1-7drh.onrender.com/api/dashboard/');
      setAllData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div>Home</div>
      <SearchBar />
      <div className="flex flex-wrap justify-center">
        <Card
          title="Total Items"
          content={`Total No of Items: ${allData.total_items || 'N/A'}`}
          target="/articles"
        />

        {latestArticle && (
          <Card
            title="Latest Article"
            content={latestArticle.title || 'No title available'}
            id={latestArticle.id}
            target={`/details/${latestArticle.id}`}
          />
        )}
      </div>

      <div className="flex flex-wrap justify-center">
        {example.map((item, index) => (
          
          <>
            <Link
                    to={`/details/${item.id}`}
                    className="text-indigo-600 hover:text-indigo-800 font-semibold"
                >
                    View Details →
            </Link>

          <Card2
            key={index}
            title={`Example Data ${index + 1}`}
            content={{
              "Title": item.title || 'N/A',
              "Sector": item.sector || 'N/A',
              "Topic": item.topic || 'N/A',
              "Country": item.country || 'N/A',
              "Relevance": item.relevance || 'N/A',
              "Likelihood": item.likelihood || 'N/A',
            }}
          />
           
          </>
        ))}
      </div>
    </>
  );
}

export default Home;
