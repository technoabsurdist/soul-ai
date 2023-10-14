import React, { useState, useEffect, useRef } from 'react';
import styles from './Archive.module.css';

const Archive = ({ reload }) => {
  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const expandedSquareRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5001/entry', {
          credentials: 'include',
        });
        if (response.status === 200) {
          const data = await response.json();
          setDocuments(data);
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
    
    const handleDocumentClick = (e) => {
      if (expandedSquareRef.current && !expandedSquareRef.current.contains(e.target)) {
        setSelectedDoc(null);
      }
    };
    
    const handleEscapePress = (e) => {
      if (e.key === 'Escape') {
        setSelectedDoc(null);
      }
    };
    
    document.addEventListener('mousedown', handleDocumentClick);
    document.addEventListener('keydown', handleEscapePress);
    
    fetchEntries();

    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
      document.removeEventListener('keydown', handleEscapePress);
    };
  }, [reload]);

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
      <p className={styles.docText}>{doc.text.substring(0, 400)}...</p>
    </div>
  );

  return (
    <>
     <div className={styles.grid}>
        {isLoading ? <p>Loading...</p> : documents.map(renderSquare)}
      </div>
      {selectedDoc && (
        <div className={styles.backdrop}></div>
      )}
      {selectedDoc && (
        <div className={styles.expandedSquare}>
          <h3>{selectedDoc.title}</h3>
          <p>{selectedDoc.text}</p>
        </div>
      )}
      {isActive && <div className={styles.backdrop}></div>}
    </>
  );
  
};

export default Archive;
