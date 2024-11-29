import React, { useEffect, useState } from 'react';
import TopNav from '../partials/Topbar';
import Navbar from '../partials/Navbar';
import axios from 'axios'; // Import axios for HTTP requests
import InfiniteScroll from 'react-infinite-scroll-component';
function Services() {
  const [services, setServices] = useState([]); // Removed redundant state for data
  const [isLoading, setIsLoading] = useState(false); // Added state for loading indicator
  const [hasMore, setHasMore] = useState(true); // Added state to check if there's more data
  const [page, setPage] = useState(1); // Added state for pagination

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://shree-jay-farnichar.onrender.com/gallery/${page}/${10}`, { // Adjusted URL for pagination
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
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
      {/* <div className="min-h-screen py-2 px-6">
        <h1 className="text-white text-3xl font-black uppercase text-center mb-10">Our Services</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div key={index} className="bg-[#1D1D1D] p-4 rounded-lg border-4 border-[#282828] shadow-lg">
              {
                service.image && (
                  <img src={`https://shree-jay-farnichar.onrender.com/uploads/${service.image}`} alt={service.title} className="w-full h-48 object-cover rounded-md" />
                )
              }
              {
                service.video && (
                  <video src={`https://shree-jay-farnichar.onrender.com/uploads/${service.video}`} controls className="w-full h-48 object-cover rounded-md" />
                )
              }
              <div className="p-4">
                <h2 className="text-xl font-bold text-[#D3AA62] mb-2">{service.title}</h2>
                <p className="text-white text-md">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
        {isLoading && <div>Loading...</div>} 
        {hasMore && <button onClick={fetchData}>Load More</button>}
      </div> */}
      <h1 className='text-white text-7xl font-black uppercase text-center flex justify-center items-center h-[80vh]'>Coming Soon</h1>
      </InfiniteScroll>
    </div>
  );
}

export default Services;
