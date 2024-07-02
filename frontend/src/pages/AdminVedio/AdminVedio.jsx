import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './AdminVedio.module.css'; // Import the CSS module
import ReactPlayer from 'react-player'; // Import ReactPlayer

const AdminVedio = () => {
 const navigate = useNavigate();
 const [videoUrl, setVideoUrl] = useState('');

 // Fetch the latest video URL from the backend
 useEffect(() => {
    const fetchLatestVideoUrl = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/latest-video-url`);
        if (!response.ok) {
          throw new Error('Failed to fetch the latest video URL.');
        }
        const data = await response.json();
        setVideoUrl(data.videoUrls);
      } catch (error) {
        console.error('Error fetching latest video URL:', error);
        toast.error('An error occurred while fetching the latest video URL.');
      }
    };

    fetchLatestVideoUrl();
 }, []); // Empty dependency array means this effect runs once on component mount

 const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log(videoUrl);
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/update-video-url`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoUrl }),
      });

      if (!response.ok) {
        const data = await response.json();
        toast.error(data.error);
      } else {
        toast.success('Video URL updated successfully!');
        // navigate('/');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while updating the video URL.');
    }
 };

 return (
    <div className={styles.container}>
      <ReactPlayer
        url={videoUrl[videoUrl.length - 1]}
        playing={true}
        loop={true}
        muted={true}
        width="100%"
        height="100%"
        style={{ position: 'absolute', top: 0, left: 0 }}
      />
      <div className={styles.card} style={{ position: 'relative', zIndex: 1 }}>
        <h1 className={styles.title}>Admin Page</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="videoUrl" className={styles.label}>Video URL:</label>
            <input
              type="text"
              id="videoUrl"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <button
            type="submit"
            className={styles.button}
          >
            Update Video URL
          </button>
        </form>
      </div>
    </div>
 );
};

export default AdminVedio;