import React, { useEffect, useState } from 'react';
import TopNav from '../partials/Topbar';
import Navbar from '../partials/Navbar';
import axios from 'axios'; // Import axios for HTTP requests
import InfiniteScroll from 'react-infinite-scroll-component';
function Services() {
  const REACT_APP_API_URL = "https://godcraft.fun";
  const [services, setServices] = useState([]); // Removed redundant state for data
  const [isLoading, setIsLoading] = useState(false); // Added state for loading indicator
  const [hasMore, setHasMore] = useState(true); // Added state to check if there's more data
  const [page, setPage] = useState(1); // Added state for pagination

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/gallery/${page}/${10}`, { // Adjusted URL for pagination
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        params: { page: page, limit: 10 } // Added query parameters for pagination
      });

      if (response.data.length > 0) {
        setServices(prevState => [...prevState, ...response.data]); // Update services state with fetched data
        setPage(page + 1); // Increment page for next fetch
      } else {
        setHasMore(false); // Set hasMore to false if no more data
      }
    } catch (error) {
      console.error("Error fetching services: ", error);
    } finally {
      setIsLoading(false); // Set isLoading to false after fetching
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <InfiniteScroll
        dataLength={services.length}
        next={fetchData}
        hasMore={hasMore}
        loader={isLoading && <h4>Loading...</h4>}
      >
      <TopNav />
      <Navbar />
     
      <h1 className='text-white text-7xl font-black uppercase text-center flex justify-center items-center h-[80vh]'>Coming Soon</h1>
      </InfiniteScroll>
    </div>
  );
}

export default Services;
