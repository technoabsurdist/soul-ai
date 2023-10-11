import React, { useState, useEffect } from "react";
import styles from './PromptInput.module.css';

export const PromptInput = ({ prompt }) => {
  const [value, setValue] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageData, setImageData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const deselectImage = () => {
    setSelectedImage(null);
  };

  const handleSubmit = async (e) => {

  };

  const handleEditSubmit = async () => {
    setLoading(true);
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'ImageEditor/1.0' },
      body: JSON.stringify({ prompt: value, original_image_url: selectedImage.url }),
    };
  
    fetch('http://localhost:5001/edit_image', options)
      .then((response) => response.json())
      .then((response) => {
        const index = imageData.findIndex(data => data.url === selectedImage.url);
        if (index !== -1) {
          imageData[index] = { url: response.new_image_url, prompt: value };
        }
        setLoading(false);
        deselectImage();
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div className={styles.inputWrapper}>
      <input
        className={styles.titleColorBorder}
        value={value}
        placeholder={selectedImage ? 'Edit this image' : prompt}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={handleSubmit}
      />
      <div className={styles.imageGrid}>
        {selectedImage ? (
          <div className={styles.selectedImageWrapper}>
            <img src={selectedImage.url} alt="Selected" className={styles.selectedImage} />
            <button className={styles.button} onClick={deselectImage}>Back</button>
            <button className={styles.button} onClick={handleEditSubmit}>Edit</button>
          </div>
        ) : (
          imageData.map((data, index) => (
            <div className={styles.hoverEffect} onClick={() => setSelectedImage(data)} key={index}>
              <img src={data.url} alt={`Generated ${index}`} className={styles.generatedImage} />
              <div className={styles.hoverText}>{data.prompt}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
