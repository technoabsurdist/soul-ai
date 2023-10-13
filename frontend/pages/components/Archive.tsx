import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Archive.module.css'; // Assuming you have a CSS module for Archive

const Archive = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:5001/entry');
        if (response.status === 200) {
          setDocuments(response.data);
          setIsLoading(false);
        } else {
          console.error('Error fetching documents');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching documents:', error);
        setIsLoading(false);
      }
    };

    fetchEntries();
  }, []);

  const handleSquareClick = (doc) => {
    setSelectedDoc(doc);
  };

  const renderSquare = (doc) => (
    <div 
      key={doc.id} 
      className={styles.square} 
      onClick={() => handleSquareClick(doc)}
    >
      <h4 className={styles.docTitle}>{doc.title}</h4>
      <p className={styles.docText}>{doc.text.substring(0, 20)}...</p>
    </div>
  );

  return (
    <>
      <h1 className={styles.title}>Archive</h1>
      <div className={styles.grid}>
        {isLoading ? <p>Loading...</p> : documents.map(renderSquare)}
      </div>
      {selectedDoc && (
        <div className={styles.expandedSquare}>
          <h3>{selectedDoc.title}</h3>
          <p>{selectedDoc.text}</p>
        </div>
      )}
    </>
  );
};

export default Archive;
