import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../partials/Navbar';
import Topbar from '../partials/Topbar';

function Updateanddelete() {
    const [data, setData] = useState([]);
    const [serviceStatus, setServiceStatus] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null);
    const [category, setCategory] = useState(null);
    const [updatedData, setUpdatedData] = useState({
        title: '',
        description: '',
        image: null,
        video: null,
        serviceStatus: serviceStatus
    });
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`https://shree-jay-farnichar.onrender.com/gallery/${page}/${limit}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                if (response.data.length > 0) {
                    setData(prevState => [...prevState, ...response.data]);
                    setPage(page + 1);
                } else {
                    setHasMore(false);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Error fetching gallery: ", error);
            } finally {
                setIsLoading(false);
            }
        };
        if (hasMore) {
            fetchData();
        }
 
    useEffect(()=>{
        fetchData();
    },[page, limit, hasMore]);
    // Handle delete action
    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://shree-jay-farnichar.onrender.com/gallery/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setData(data.filter(item => item._id !== id)); // Remove item from state after delete
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    // Handle update form input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData({ ...updatedData, [name]: value });
    };

    // Handle file input change
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setUpdatedData({ ...updatedData, [name]: files[0] });
    };

    // Handle update submission
    const handleUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', updatedData.title);
        formData.append('description', updatedData.description);
        formData.append('serviceStatus', updatedData.serviceStatus.toString());
        formData.append('category', category);
        if (updatedData.image) formData.append('image', updatedData.image);
        if (updatedData.video) formData.append('video', updatedData.video);

        try {
            const response = await axios.put(`https://shree-jay-farnichar.onrender.com/gallery/${selectedItem._id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setData(data.map(item => (item._id === selectedItem._id ? response.data : item))); // Update the item in state
            setSelectedItem(null); // Clear selected item after update
            setUpdatedData({ title: '', description: '', image: null, video: null });
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };
    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };
    return (
        <div className='h-screen text-white'>
            <Topbar/>
            <Navbar/>
            <h1 className='text-center text-2xl mb-4'>Update and Delete Gallery Items</h1>
            
            <div className='flex flex-wrap'>
            {data.map(item => (
  <div key={item._id} className="border p-4 mb-4">
    <h2>{item.title}</h2>
    <p>{item.description}</p>
    {item.image ? (
      <img src={`https://shree-jay-farnichar.onrender.com/uploads/${item.image}`} alt={item.title} className="w-32 h-32" />
    ) : (
      <p>No image available</p>
    )}
    {item.video ? (
      <video src={`https://shree-jay-farnichar.onrender.com/uploads/${item.video}`} controls className="w-32 h-32"></video>
    ) : (
      <p>No video available</p>
    )}
    <button
      onClick={() => {
        setSelectedItem(item);
        setUpdatedData({
          title: item.title,
          description: item.description,
          serviceStatus: item.serviceStatus
        });
      }}
      className="bg-blue-500 text-white px-4 py-2 mt-2 mr-2"
    >
      Update
    </button>
    <button
      onClick={() => setServiceStatus(item._id === selectedItem?._id ? !serviceStatus : serviceStatus)}
      className="bg-green-500 text-white px-4 py-2 mt-2 mr-2"
    >
      {serviceStatus ? 'Deactivate' : 'Activate'}
    </button>
    <button
      onClick={() => handleDelete(item._id)}
      className="bg-red-500 text-white px-4 py-2 mt-2"
    >
      Delete
    </button>
    { item._id === selectedItem?._id && (
                <div className="mt-6 text-black">
                    <h2 className="text-xl mb-2">Update Gallery Item</h2>
                    <form onSubmit={handleUpdate}>
                        <select
                            name="category"
                            value={category}
                            onChange={handleCategoryChange}
                            className="mb-2 p-2 w-full"
                        >
                            {/* <option value="Gallery">Gallery</option> */}
                            <option value="Furniture">Furniture</option>
                            <option value="Carpets">Carpets</option>
                            <option value="Wooden Furniture">Wooden Furniture</option>
                            <option value="Interior Design">Interior Design</option>
                        </select>
                        <input
                            type="text"
                            name="title"
                            value={updatedData.title}
                            onChange={handleInputChange}
                            placeholder="Title"
                            className="mb-2 p-2 w-full"
                        />
                        <textarea
                            name="description"
                            value={updatedData.description}
                            onChange={handleInputChange}
                            placeholder="Description"
                            className="mb-2 p-2 w-full"
                        />
                        <input
                            type="file"
                            name="image"
                            onChange={handleFileChange}
                            className="mb-2 p-2 w-full"
                        />
                        <input
                            type="file"
                            name="video"
                            onChange={handleFileChange}
                            className="mb-2 p-2 w-full"
                        />
                        <button type="submit" className="bg-green-500 text-white px-4 py-2">
                            Update Item
                        </button>
                    </form>
                </div>
            )}
  </div>
))}

            </div>

            {/* Update Form */}
           
        </div>
    );
}

export default Updateanddelete;
