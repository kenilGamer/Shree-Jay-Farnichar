import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

function Dashboard() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  // Image upload handler
  const handleImageUpload = async (file) => {
    if (file.type.startsWith('image')) {
      const formData = new FormData();
      formData.append('image', file);  // Ensure the field name is 'image'

      try {
        setUploading(true);
        setUploadProgress(0);  // Reset progress
        await axios.post('https://shree-jay-farnichar.onrender.com/gallery', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
            setUploadProgress(progress);
          },
        });
        setUploading(false);
        alert('Image uploaded successfully');
      } catch (error) {
        console.error('Error uploading image:', error);
        setUploading(false);
      }
    } else {
      alert('Please upload a valid image file.');
    }
  };

  // Video upload handler
  const handleVideoUpload = async (file) => {
    if (file.type.startsWith('video')) {
      const formData = new FormData();
      formData.append('video', file);  // Ensure the field name is 'video'

      try {
        setUploading(true);
        setUploadProgress(0);  // Reset progress
        await axios.post('https://shree-jay-farnichar.onrender.com/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
            setUploadProgress(progress);
          },
        });
        setUploading(false);
        alert('Video uploaded successfully');
      } catch (error) {
        console.error('Error uploading video:', error);
        setUploading(false);
      }
    } else {
      alert('Please upload a valid video file.');
    }
  };

  // Drag-and-drop setup for image and video
  const onDropImage = (acceptedFiles) => {
    const file = acceptedFiles[0];
    handleImageUpload(file);
    setSelectedImage(URL.createObjectURL(file));
  };

  const onDropVideo = (acceptedFiles) => {
    const file = acceptedFiles[0];
    handleVideoUpload(file);
    setSelectedVideo(URL.createObjectURL(file));
  };

  const { getRootProps: getImageRootProps, getInputProps: getImageInputProps } = useDropzone({
    onDrop: onDropImage,
    accept: 'image/*',
  });

  const { getRootProps: getVideoRootProps, getInputProps: getVideoInputProps } = useDropzone({
    onDrop: onDropVideo,
    accept: 'video/*',
  });

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-600 text-white p-6 space-y-8">
        <h2 className="text-2xl font-bold text-center">Dashboard</h2>
        <nav>
          <ul className="space-y-6">
            <li><a href="/dashboard" className="block hover:bg-blue-700 p-2 rounded">Home</a></li>
            <li><a href="/updateanddelete" className="block hover:bg-blue-700 p-2 rounded">Update and Delete</a></li>
            <li><a href="/logout" className="block hover:bg-blue-700 p-2 rounded">Logout</a></li>
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8">
        {/* Topbar */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome to Your Dashboard</h1>
        </div>

        {/* File Upload Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Upload Image or Video</h2>

          {/* Image Upload with Drag-and-Drop */}
          <div className="mb-6">
            <label htmlFor="imageUpload" className="block text-lg font-medium text-gray-700 mb-2">Upload Image</label>
            <div {...getImageRootProps()} className="border-2 border-dashed p-6 rounded-md text-center cursor-pointer hover:bg-gray-200">
              <input {...getImageInputProps()} />
              <p className="text-gray-500">Drag & drop an image, or click to select a file</p>
            </div>
            {selectedImage && (
              <div className="mt-4">
                <p className="text-gray-600">Preview:</p>
                <img src={selectedImage} alt="Preview" className="mt-2 max-w-xs h-auto rounded-md shadow-md" />
              </div>
            )}
          </div>

          {/* Video Upload with Drag-and-Drop */}
          <div>
            <label htmlFor="videoUpload" className="block text-lg font-medium text-gray-700 mb-2">Upload Video</label>
            <div {...getVideoRootProps()} className="border-2 border-dashed p-6 rounded-md text-center cursor-pointer hover:bg-gray-200">
              <input {...getVideoInputProps()} />
              <p className="text-gray-500">Drag & drop a video, or click to select a file</p>
            </div>
            {selectedVideo && (
              <div className="mt-4">
                <p className="text-gray-600">Preview:</p>
                <video className="mt-2 max-w-xs h-auto rounded-md shadow-md" controls>
                  <source src={selectedVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>

          {/* Upload Progress */}
          {uploading && (
            <div className="mt-4">
              <p className="text-gray-600">Uploading... {uploadProgress}%</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
