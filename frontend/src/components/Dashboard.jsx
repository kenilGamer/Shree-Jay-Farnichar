import React, { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { useNavigate, Link } from "react-router-dom";
import { 
  FaUpload, 
  FaImage, 
  FaVideo, 
  FaHome, 
  FaEdit, 
  FaSignOutAlt, 
  FaSpinner, 
  FaCheckCircle, 
  FaExclamationTriangle,
  FaFolderOpen,
  FaTag,
  FaFileAlt,
  FaTrash,
  FaEye,
  FaCog,
  FaChartBar,
  FaUsers
} from 'react-icons/fa';

function Dashboard() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [imageTitle, setImageTitle] = useState("");
  const [imageDescription, setImageDescription] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [category, setCategory] = useState("");
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('images');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const REACT_APP_API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Helper function to append files to FormData
  const appendFilesToFormData = (formData, files, fieldName) => {
    files.forEach((file) => {
      formData.append(fieldName, file, file.name);
    });
  };

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

  // Handle Image Upload
  const handleImageUpload = async () => {
    if (!selectedImages.length) {
      showError("Please select at least one image.");
      return;
    }

    const formData = new FormData();
    appendFilesToFormData(formData, selectedImages, "image");
    formData.append("title", imageTitle);
    formData.append("description", imageDescription);
    formData.append("category", category);

    try {
      setUploading(true);
      const response = await axios.post(`${REACT_APP_API_URL}/gallery`, formData, {
        headers: { 
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (event) => {
          const progress = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(progress);
        },
      });
      console.log("Images uploaded successfully:", response.data);
      showSuccess("Images uploaded successfully!");
      resetImageFields();
    } catch (error) {
      console.error("Error uploading images:", error.response?.data || error.message);
      showError("Failed to upload images. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // Handle Video Upload
  const handleVideoUpload = async () => {
    if (!selectedVideos.length) {
      showError("Please select at least one video.");
      return;
    }

    const formData = new FormData();
    appendFilesToFormData(formData, selectedVideos, "video");
    formData.append("title", videoTitle);
    formData.append("description", videoDescription);
    formData.append("category", category);

    try {
      setUploading(true);
      const response = await axios.post(`${REACT_APP_API_URL}/gallery`, formData, {
        headers: { 
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (event) => {
          const progress = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(progress);
        },
      });
      console.log("Videos uploaded successfully:", response.data);
      showSuccess("Videos uploaded successfully!");
      resetVideoFields();
    } catch (error) {
      console.error("Error uploading videos:", error.response?.data || error.message);
      showError("Failed to upload videos. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // Reset Fields
  const resetImageFields = () => {
    setSelectedImages([]);
    setImageTitle("");
    setImageDescription("");
  };

  const resetVideoFields = () => {
    setSelectedVideos([]);
    setVideoTitle("");
    setVideoDescription("");
  };

  // Dropzone Handlers
  const onDropImages = (acceptedFiles) => setSelectedImages(acceptedFiles);
  const onDropVideos = (acceptedFiles) => setSelectedVideos(acceptedFiles);

  const { getRootProps: getImageRootProps, getInputProps: getImageInputProps } =
  useDropzone({ onDrop: onDropImages, accept: { "image/*": [".jpg", ".jpeg", ".png", ".gif"] }, multiple: true });

  const { getRootProps: getVideoRootProps, getInputProps: getVideoInputProps } =
  useDropzone({ onDrop: onDropVideos, accept: { "video/*": [".mp4", ".avi", ".mov"] }, multiple: true });

  // Handle Logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const categories = [
    "Gallery", "Furniture", "Carpets", "Wooden Furniture", 
    "Interior Design", "Painting", "Plumbing", "Electrical", "Carpentry"
  ];

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

        {/* Upload Progress */}
        {uploading && (
          <div className="fixed top-0 left-0 w-full bg-gradient-to-r from-[#D3AA62] to-[#F4D03F] text-black py-3 text-center z-50">
            <div className="flex items-center justify-center gap-3">
              <FaSpinner className="animate-spin" />
              <span className="font-semibold">Uploading... {uploadProgress}%</span>
            </div>
            <div className="w-full bg-black/20 h-1 mt-2">
              <div 
                className="bg-black h-1 transition-all duration-300" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <div className="card-modern sticky top-32">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[#D3AA62] to-[#F4D03F] rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCog className="text-2xl text-black" />
                </div>
                <h2 className="heading-sm text-white">Admin Dashboard</h2>
                <p className="text-gray-400 text-sm">Manage your content</p>
              </div>
              
              <nav className="space-y-2">
                <Link 
                  to="/" 
                  className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                >
                  <FaHome className="text-sm" />
                  Home
                </Link>
                <Link 
                  to="/updateanddelete" 
                  className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                >
                  <FaEdit className="text-sm" />
                  Manage Content
                </Link>
                <Link 
                  to="/gallery" 
                  className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                >
                  <FaEye className="text-sm" />
                  View Gallery
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-red-500/20 rounded-lg transition-all duration-300"
                >
                  <FaSignOutAlt className="text-sm" />
                  Logout
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 ">
            <div className="card-modern">
              <div className="mb-8">
                <h1 className="heading-md gradient-text mb-4">Content Management</h1>
                <p className="text-gray-300">
                  Upload and manage your gallery images and videos with ease.
                </p>
              </div>

              {/* Tab Navigation */}
              <div className="flex gap-2 mb-8">
                <button
                  onClick={() => setActiveTab('images')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === 'images'
                      ? 'bg-[#D3AA62] text-black'
                      : 'bg-white/10 text-gray-300 hover:text-white hover:bg-white/20'
                  }`}
                >
                  <FaImage className="text-sm" />
                  Upload Images
                </button>
                <button
                  onClick={() => setActiveTab('videos')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === 'videos'
                      ? 'bg-[#D3AA62] text-black'
                      : 'bg-white/10 text-gray-300 hover:text-white hover:bg-white/20'
                  }`}
                >
                  <FaVideo className="text-sm" />
                  Upload Videos
                </button>
              </div>

              {/* Image Upload Tab */}
              {activeTab === 'images' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                      <FaImage className="text-[#D3AA62]" />
                      Image Upload
                    </h3>
                    
                    {/* Dropzone */}
                    <div 
                      {...getImageRootProps()} 
                      className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:border-[#D3AA62] hover:bg-[#D3AA62]/5 transition-all duration-300"
                    >
                      <input {...getImageInputProps()} />
                      <FaUpload className="text-4xl text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-300 text-lg mb-2">Drag & drop images here</p>
                      <p className="text-gray-400 text-sm">or click to select files</p>
                      <p className="text-gray-500 text-xs mt-2">Supports: JPG, PNG, GIF</p>
                    </div>
                    
                    {selectedImages.length > 0 && (
                      <div className="mt-4 p-4 bg-[#1A1A1A] rounded-lg">
                        <h4 className="text-white font-medium mb-4">Selected Images:</h4>
                        
                        {/* Image Previews */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                          {selectedImages.map((image, index) => (
                            <div key={index} className="relative group">
                              <div className="aspect-square rounded-lg overflow-hidden bg-gray-800">
                                <img
                                  src={URL.createObjectURL(image)}
                                  alt={image.name}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                              </div>
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                                <button
                                  onClick={() => {
                                    const newImages = selectedImages.filter((_, i) => i !== index);
                                    setSelectedImages(newImages);
                                  }}
                                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors duration-300"
                                  title="Remove image"
                                >
                                  <FaTrash className="text-sm" />
                                </button>
                              </div>
                              <div className="mt-2">
                                <p className="text-xs text-gray-300 truncate" title={image.name}>
                                  {image.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {(image.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* File List Summary */}
                        <div className="border-t border-gray-600 pt-3">
                          <div className="flex items-center justify-between text-sm text-gray-300">
                            <span className="flex items-center gap-2">
                              <FaImage className="text-[#D3AA62]" />
                              {selectedImages.length} image{selectedImages.length !== 1 ? 's' : ''} selected
                            </span>
                            <span className="text-gray-500">
                              Total: {(selectedImages.reduce((acc, img) => acc + img.size, 0) / 1024 / 1024).toFixed(2)} MB
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <FaTag className="inline mr-2 text-[#D3AA62]" />
                        Category
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-3 bg-[#1A1A1A] border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D3AA62] focus:border-transparent"
                      >
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <FaFileAlt className="inline mr-2 text-[#D3AA62]" />
                        Image Title
                      </label>
                      <input
                        type="text"
                        value={imageTitle}
                        onChange={(e) => setImageTitle(e.target.value)}
                        className="w-full px-4 py-3 bg-[#1A1A1A] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D3AA62] focus:border-transparent"
                        placeholder="Enter image title"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <FaFileAlt className="inline mr-2 text-[#D3AA62]" />
                      Description
                    </label>
                    <textarea
                      value={imageDescription}
                      onChange={(e) => setImageDescription(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 bg-[#1A1A1A] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D3AA62] focus:border-transparent"
                      placeholder="Enter image description"
                    />
                  </div>

                  <button 
                    onClick={handleImageUpload} 
                    disabled={uploading || !selectedImages.length}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <FaUpload />
                    Upload Images
                  </button>
                </div>
              )}

              {/* Video Upload Tab */}
              {activeTab === 'videos' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                      <FaVideo className="text-[#D3AA62]" />
                      Video Upload
                    </h3>
                    
                    {/* Dropzone */}
                    <div 
                      {...getVideoRootProps()} 
                      className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:border-[#D3AA62] hover:bg-[#D3AA62]/5 transition-all duration-300"
                    >
                      <input {...getVideoInputProps()} />
                      <FaUpload className="text-4xl text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-300 text-lg mb-2">Drag & drop videos here</p>
                      <p className="text-gray-400 text-sm">or click to select files</p>
                      <p className="text-gray-500 text-xs mt-2">Supports: MP4, AVI, MOV</p>
                    </div>
                    
                    {selectedVideos.length > 0 && (
                      <div className="mt-4 p-4 bg-[#1A1A1A] rounded-lg">
                        <h4 className="text-white font-medium mb-4">Selected Videos:</h4>
                        
                        {/* Video Previews */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          {selectedVideos.map((video, index) => (
                            <div key={index} className="relative group">
                              <div className="aspect-video rounded-lg overflow-hidden bg-gray-800">
                                <video
                                  src={URL.createObjectURL(video)}
                                  className="w-full h-full object-cover"
                                  muted
                                  controls
                                />
                              </div>
                              <div className="absolute top-2 right-2">
                                <button
                                  onClick={() => {
                                    const newVideos = selectedVideos.filter((_, i) => i !== index);
                                    setSelectedVideos(newVideos);
                                  }}
                                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors duration-300"
                                  title="Remove video"
                                >
                                  <FaTrash className="text-sm" />
                                </button>
                              </div>
                              <div className="mt-2">
                                <p className="text-sm text-gray-300 truncate" title={video.name}>
                                  {video.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {(video.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* File List Summary */}
                        <div className="border-t border-gray-600 pt-3">
                          <div className="flex items-center justify-between text-sm text-gray-300">
                            <span className="flex items-center gap-2">
                              <FaVideo className="text-[#D3AA62]" />
                              {selectedVideos.length} video{selectedVideos.length !== 1 ? 's' : ''} selected
                            </span>
                            <span className="text-gray-500">
                              Total: {(selectedVideos.reduce((acc, vid) => acc + vid.size, 0) / 1024 / 1024).toFixed(2)} MB
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <FaTag className="inline mr-2 text-[#D3AA62]" />
                        Category
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-3 bg-[#1A1A1A] border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D3AA62] focus:border-transparent"
                      >
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <FaFileAlt className="inline mr-2 text-[#D3AA62]" />
                        Video Title
                      </label>
                      <input
                        type="text"
                        value={videoTitle}
                        onChange={(e) => setVideoTitle(e.target.value)}
                        className="w-full px-4 py-3 bg-[#1A1A1A] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D3AA62] focus:border-transparent"
                        placeholder="Enter video title"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <FaFileAlt className="inline mr-2 text-[#D3AA62]" />
                      Description
                    </label>
                    <textarea
                      value={videoDescription}
                      onChange={(e) => setVideoDescription(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 bg-[#1A1A1A] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D3AA62] focus:border-transparent"
                      placeholder="Enter video description"
                    />
                  </div>

                  <button 
                    onClick={handleVideoUpload} 
                    disabled={uploading || !selectedVideos.length}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <FaUpload />
                    Upload Videos
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;