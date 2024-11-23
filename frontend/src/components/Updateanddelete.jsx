import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../partials/Navbar';
import Topbar from '../partials/Topbar';

function Updateanddelete() {
    const [data, setData] = useState([]);
    const [serviceStatus, setServiceStatus] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null);
    const [updatedData, setUpdatedData] = useState({
        title: '',
        description: '',
        image: null,
        video: null,
        serviceStatus: serviceStatus
    });
   
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`https://shree-jay-farnichar.onrender.com/gallery`); // Adjust the route if needed
            setData(response.data);
        };
        fetchData();
    }, []);

    // Handle delete action
    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://shree-jay-farnichar.onrender.com/gallery/${id}`);
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
        if (updatedData.image) formData.append('image', updatedData.image);
        if (updatedData.video) formData.append('video', updatedData.video);

        try {
            const response = await axios.put(`http://localhost:3000/gallery/${selectedItem._id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setData(data.map(item => (item._id === selectedItem._id ? response.data : item))); // Update the item in state
            setSelectedItem(null); // Clear selected item after update
            setUpdatedData({ title: '', description: '', image: null, video: null });
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    return (
        <div className='h-screen text-white'>
            <Topbar/>
            <Navbar/>
            <h1 className='text-center text-2xl mb-4'>Update and Delete Gallery Items</h1>
            
            <div >
            {data.map(item => (
  <div key={item._id} className="border p-4 mb-4">
    <h2>{item.title}</h2>
    <p>{item.description}</p>
    {item.image ? (
      <img src={`http://localhost:3000/uploads/${item.image}`} alt={item.title} className="w-32 h-32" />
    ) : (
      <p>No image available</p>
    )}
    {item.video ? (
      <video src={`http://localhost:3000/uploads/${item.video}`} controls className="w-32 h-32"></video>
    ) : (
      <p>No video available</p>
    )}
    <button
      onClick={() => {
        setSelectedItem(item);
        setUpdatedData({
          title: item.title,
          description: item.description
        });
      }}
      className="bg-blue-500 text-white px-4 py-2 mt-2 mr-2"
    >
      Update
    </button>
    <button
      onClick={() => setServiceStatus(!serviceStatus)}
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
  </div>
))}

            </div>

            {/* Update Form */}
            {selectedItem && (
                <div className="mt-6 text-black">
                    <h2 className="text-xl mb-2">Update Gallery Item</h2>
                    <form onSubmit={handleUpdate}>
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
    );
}

export default Updateanddelete;
