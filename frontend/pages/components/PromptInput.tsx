import React, { useState, useEffect, useRef } from "react";
import styles from './PromptInput.module.css';

const PromptInput = ( ) => {
  const [value, setValue] = useState('');
  const textAreaRef = useRef(null);
  const [showButton, setShowButton] = useState(false);

  const handleTextChange = (e: any) => {
    setValue(e.target.value);
    resizeTextArea();
    setShowButton(true); // Show button when text changes
  };

  const handleFocus = () => {
    setShowButton(true); // Show button on focus
  };

  const resizeTextArea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
      resizeTextArea();
  }, [value]);

  const submitEntry = async (e: React.FormEvent) => {
    e.preventDefault(); 
    try {
      const title = 'Testing Title 1';
      const response = await fetch('http://localhost:5001/entry', {
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ title: title, text: value }),
      })
      if (response.ok) {
        console.log('entry success');
        setValue('');  // Clear the text area
      } else {
        console.error('error');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }

  return (
    <div className={styles.inputWrapper}>
      <textarea
        ref={textAreaRef}
        className={`${styles.titleColorBorder} ${styles.expandedTextArea}`}
        value={value}
        placeholder={"What are you thinking..."} 
        onChange={handleTextChange}
      />
      <button className={styles.submitButton} onClick={submitEntry}>Submit</button> 
    </div>
  );
};

export default PromptInput;
