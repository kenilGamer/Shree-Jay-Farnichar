import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { 
  FaEdit, 
  FaTrash, 
  FaSave, 
  FaTimes, 
  FaSpinner, 
  FaImage, 
  FaVideo, 
  FaTag,
  FaFileAlt,
  FaUpload,
  FaEye,
  FaCheckCircle,
  FaExclamationTriangle
} from 'react-icons/fa';

function Updateanddelete() {
  const [data, setData] = useState([]);
  const [serviceStatus, setServiceStatus] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [category, setCategory] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    title: "",
    description: "",
    image: null,
    video: null,
    serviceStatus: serviceStatus,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const REACT_APP_API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const categories = [
    "Gallery", "Furniture", "Carpets", "Wooden Furniture", 
    "Interior Design", "Painting", "Plumbing", "Electrical", "Carpentry"
  ];

  // Show success message
  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 5000);
  };

  // Show error message
  const showError = (message) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(''), 5000);
  };

  const fetchData = async () => {
    if (!hasMore) return;
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/gallery/${page}/${limit}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log('API Response:', response.data);
      console.log('Current page:', page);
      console.log('Current data length:', data.length);
      
      if (response.data.length > 0) {
        setData((prevState) => {
          // Filter out duplicates based on _id
          const existingIds = new Set(prevState.map(item => item._id));
          const newItems = response.data.filter(item => !existingIds.has(item._id));
          const newData = [...prevState, ...newItems];
          console.log('Existing IDs:', Array.from(existingIds));
          console.log('New items:', newItems);
          console.log('Final data length:', newData.length);
          return newData;
        });
        setPage(prevPage => prevPage + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching gallery: ", error);
      showError("Failed to load gallery items. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch all data at once to avoid pagination issues
  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/gallery`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log('All gallery data:', response.data);
      setData(response.data || []);
      setHasMore(false); // No more pagination needed
    } catch (error) {
      console.error("Error fetching all gallery data: ", error);
      showError("Failed to load gallery items. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Handle delete action
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    }

    try {
      await axios.delete(
        `${REACT_APP_API_URL}/gallery/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setData(data.filter((item) => item._id !== id));
      showSuccess("Item deleted successfully!");
    } catch (error) {
      console.error("Error deleting item:", error);
      showError("Failed to delete item. Please try again.");
    }
  };

  // Handle update action
  const handleUpdate = async () => {
    if (!selectedItem) return;

    const formData = new FormData();
    formData.append("title", updatedData.title);
    formData.append("description", updatedData.description);
    formData.append("category", category);
    formData.append("serviceStatus", serviceStatus);

    if (updatedData.image) {
      formData.append("image", updatedData.image);
    }
    if (updatedData.video) {
      formData.append("video", updatedData.video);
    }

    try {
      const response = await axios.put(
        `${REACT_APP_API_URL}/gallery/${selectedItem._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setData(
        data.map((item) =>
          item._id === selectedItem._id ? response.data : item
        )
      );
      setSelectedItem(null);
      setUpdatedData({ title: "", description: "", image: null, video: null });
      showSuccess("Item updated successfully!");
    } catch (error) {
      console.error("Error updating item:", error);
      showError("Failed to update item. Please try again.");
    }
  };

  // Handle edit button click
  const handleEdit = (item) => {
    setSelectedItem(item);
    setUpdatedData({
      title: item.title || "",
      description: item.description || "",
      image: null,
      video: null,
    });
    setCategory(item.category || "");
    setServiceStatus(item.serviceStatus !== undefined ? item.serviceStatus : true);
  };

  // Handle category change
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  // Get image source safely
  const getImageSrc = (item) => {
    if (!item.image) return null;
    const imageSrc = Array.isArray(item.image) ? item.image[0] : item.image;
    return imageSrc ? `${REACT_APP_API_URL}/uploads/${imageSrc}` : null;
  };

  // Get video source safely
  const getVideoSrc = (item) => {
    if (!item.video) return null;
    const videoSrc = Array.isArray(item.video) ? item.video[0] : item.video;
    return videoSrc ? `${REACT_APP_API_URL}/uploads/${videoSrc}` : null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0A0A0A] to-[#1A1A1A] pt-32">
      <div className="container mx-auto px-4 py-8">
        {/* Success/Error Messages */}
        {successMessage && (
          <div className="fixed top-20 right-4 z-50 bg-green-500/90 backdrop-blur-md text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
            <FaCheckCircle className="text-xl" />
            <span>{successMessage}</span>
          </div>
        )}
        
        {errorMessage && (
          <div className="fixed top-20 right-4 z-50 bg-red-500/90 backdrop-blur-md text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
            <FaExclamationTriangle className="text-xl" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="heading-lg gradient-text mb-4">Manage Gallery Items</h1>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6">
            Update, delete, and manage your gallery content with ease.
          </p>
          
          {/* Data Management */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="text-sm text-gray-400">
              Showing {data.length} item{data.length !== 1 ? 's' : ''}
            </div>
            <button
              onClick={() => {
                setData([]);
                setPage(1);
                setHasMore(true);
                fetchAllData();
              }}
              className="btn-secondary text-sm"
            >
              Refresh Data
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {data.map((item, index) => (
            <div key={item._id || `item-${index}`} className="card-modern group">
              <div className="relative">
                {/* Media Display */}
                <div className="aspect-square rounded-xl overflow-hidden mb-4">
                  {getImageSrc(item) ? (
                    <img
                      src={getImageSrc(item)}
                      alt={item.title || 'Gallery Item'}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = '/img1.jpg';
                      }}
                    />
                  ) : getVideoSrc(item) ? (
                    <video
                      src={getVideoSrc(item)}
                      className="w-full h-full object-cover"
                      muted
                    />
                  ) : (
                    <div className="w-full h-full bg-[#1A1A1A] flex items-center justify-center">
                      <FaImage className="text-4xl text-gray-500" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1 line-clamp-2">
                      {item.title || 'Untitled'}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2">
                      {item.description || 'No description'}
                    </p>
                  </div>

                  {item.category && (
                    <div className="flex items-center gap-2">
                      <FaTag className="text-[#D3AA62] text-sm" />
                      <span className="text-[#D3AA62] text-sm font-medium">
                        {item.category}
                      </span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="flex-1 btn-secondary flex items-center justify-center gap-2 text-sm"
                    >
                      <FaEdit />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 px-3 py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                    >
                      <FaTrash />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button - Hidden since we fetch all data at once */}
        {hasMore && (
          <div className="text-center">
            <button
              onClick={fetchAllData}
              disabled={isLoading}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <FaUpload />
                  Load All
                </>
              )}
            </button>
          </div>
        )}

        {/* Edit Modal */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="bg-[#1A1A1A] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Edit Item</h2>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                </div>

                {/* Form */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <FaFileAlt className="inline mr-2 text-[#D3AA62]" />
                      Title
                    </label>
                    <input
                      type="text"
                      value={updatedData.title}
                      onChange={(e) => setUpdatedData({...updatedData, title: e.target.value})}
                      className="w-full px-4 py-3 bg-[#0A0A0A] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D3AA62] focus:border-transparent"
                      placeholder="Enter title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <FaFileAlt className="inline mr-2 text-[#D3AA62]" />
                      Description
                    </label>
                    <textarea
                      value={updatedData.description}
                      onChange={(e) => setUpdatedData({...updatedData, description: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-3 bg-[#0A0A0A] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D3AA62] focus:border-transparent"
                      placeholder="Enter description"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <FaTag className="inline mr-2 text-[#D3AA62]" />
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={handleCategoryChange}
                      className="w-full px-4 py-3 bg-[#0A0A0A] border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D3AA62] focus:border-transparent"
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <FaImage className="inline mr-2 text-[#D3AA62]" />
                      Update Image (Optional)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setUpdatedData({...updatedData, image: e.target.files[0]})}
                      className="w-full px-4 py-3 bg-[#0A0A0A] border border-gray-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#D3AA62] file:text-black hover:file:bg-[#F4D03F]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <FaVideo className="inline mr-2 text-[#D3AA62]" />
                      Update Video (Optional)
                    </label>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => setUpdatedData({...updatedData, video: e.target.files[0]})}
                      className="w-full px-4 py-3 bg-[#0A0A0A] border border-gray-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#D3AA62] file:text-black hover:file:bg-[#F4D03F]"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={handleUpdate}
                      className="flex-1 btn-primary flex items-center justify-center gap-2"
                    >
                      <FaSave />
                      Save Changes
                    </button>
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="flex-1 btn-secondary flex items-center justify-center gap-2"
                    >
                      <FaTimes />
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Updateanddelete;