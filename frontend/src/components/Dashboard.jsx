import React, { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { Navigate, useNavigate } from "react-router-dom";

function Dashboard() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [imageTitle, setImageTitle] = useState("");
  const [imageDescription, setImageDescription] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [category, setCategory] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleImageUpload = async () => {
    if (selectedImages.length === 0) {
      alert("Please select at least one image.");
      return;
    }

    const formData = new FormData();
    selectedImages.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });
    formData.append("title", imageTitle);
    formData.append("description", imageDescription);
    formData.append("category", category);

    try {
      setUploading(true);
      setUploadProgress(0);
      await axios.post("https://backend1.shreejayfurniture.store/gallery", formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem('token')}` },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          setUploadProgress(progress);
        },
      });
      setUploading(false);
      alert("Images uploaded successfully");
      resetImageFields();
    } catch (error) {
      console.error("Error uploading images:", error);
      setUploading(false);
    }
  };

  const handleVideoUpload = async () => {
    if (selectedVideos.length === 0) {
      alert("Please select at least one video.");
      return;
    }

    const formData = new FormData();
    selectedVideos.forEach((video, index) => {
      formData.append(`videos[${index}]`, video);
    });
    formData.append("title", videoTitle);
    formData.append("description", videoDescription);

    try {
      setUploading(true);
      setUploadProgress(0);
      await axios.post("https://backend1.shreejayfurniture.store/gallery", formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem('token')}` },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          setUploadProgress(progress);
        },
      });
      setUploading(false);
      alert("Videos uploaded successfully");
      resetVideoFields();
    } catch (error) {
      console.error("Error uploading videos:", error);
      setUploading(false);
    }
  };

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

  const onDropImages = (acceptedFiles) => {
    setSelectedImages(acceptedFiles);
  };

  const onDropVideos = (acceptedFiles) => {
    setSelectedVideos(acceptedFiles);
  };

  const { getRootProps: getImageRootProps, getInputProps: getImageInputProps } =
    useDropzone({ onDrop: onDropImages, accept: "image/*", multiple: true });

  const { getRootProps: getVideoRootProps, getInputProps: getVideoInputProps } =
    useDropzone({ onDrop: onDropVideos, accept: "video/*", multiple: true });

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    
    navigate('/');
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
    
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-blue-600 text-white p-4 space-y-8">
        <h2 className="text-2xl font-bold text-center">Dashboard</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <a href="/" className="block hover:bg-blue-700 p-2 rounded">
                Home
              </a>
            </li>
            <li>
              <a href="/updateanddelete" className="block hover:bg-blue-700 p-2 rounded">
                Update and Delete
              </a>
            </li>
            <li>
              <button onClick={handleLogout} className="block hover:bg-blue-700 p-2 rounded">
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
      {uploading && (
        <div className="fixed top-0 left-0 w-full bg-blue-500 text-white py-2 text-center">
          Uploading... {uploadProgress}%
        </div>
      )}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome to Your Dashboard</h1>

        {/* Image Upload */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Upload Images</h2>
          <div {...getImageRootProps()} className="border-2 border-dashed p-4 rounded-md text-center cursor-pointer hover:bg-gray-200">
            <input {...getImageInputProps()} />
            <p className="text-gray-500">Drag & drop images, or click to select</p>
          </div>
          {selectedImages.length > 0 && <p className="mt-2 text-gray-700">Files: {selectedImages.map(image => image.name).join(', ')}</p>}
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mb-2 p-2 w-full"
          >
            <option value="Gallery">Gallery</option>
            <option value="Furniture">Furniture</option>
            <option value="Carpets">Carpets</option>
            <option value="Wooden Furniture">Wooden Furniture</option>
            <option value="Interior Design">Interior Design</option>
            <option value="Painting">Painting</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="Carpentry">Carpentry</option>
          </select>
          <input
            type="text"
            placeholder="Image Title"
            value={imageTitle}
            onChange={(e) => setImageTitle(e.target.value)}
            className="block w-full mt-2 p-2 border rounded-md"
          />
          <textarea
            placeholder="Image Description"
            value={imageDescription}
            onChange={(e) => setImageDescription(e.target.value)}
            className="block w-full mt-2 p-2 border rounded-md"
          ></textarea>
          <button onClick={handleImageUpload} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Upload Images
          </button>
        </div>

        {/* Video Upload */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700">Upload Videos</h2>
          <div {...getVideoRootProps()} className="border-2 border-dashed p-4 rounded-md text-center cursor-pointer hover:bg-gray-200">
            <input {...getVideoInputProps()} />
            <p className="text-gray-500">Drag & drop videos, or click to select</p>
          </div>
          {selectedVideos.length > 0 && <p className="mt-2 text-gray-700">Files: {selectedVideos.map(video => video.name).join(', ')}</p>}
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mb-2 p-2 w-full"
          >
            <option value="Gallery">Gallery</option>
            <option value="Furniture">Furniture</option>
            <option value="Carpets">Carpets</option>
            <option value="Wooden Furniture">Wooden Furniture</option>
            <option value="Interior Design">Interior Design</option>
            <option value="Painting">Painting</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="Carpentry">Carpentry</option>
          </select>
          <input
            type="text"
            placeholder="Video Title"
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
            className="block w-full mt-2 p-2 border rounded-md"
          />
          <textarea
            placeholder="Video Description"
            value={videoDescription}
            onChange={(e) => setVideoDescription(e.target.value)}
            className="block w-full mt-2 p-2 border rounded-md"
          ></textarea>
          <button onClick={handleVideoUpload} className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Upload Videos
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
