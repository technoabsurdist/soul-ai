import React, { useState, useEffect, useRef } from "react";
import styles from './PromptInput.module.css';

const PromptInput = (props) => {
  const [value, setValue] = useState('');
  const [isActive, setIsActive] = useState(false);
  const textAreaRef = useRef(null);

  const handleTextChange = (e) => {
    setValue(e.target.value);
    resizeTextArea();
  };

  const resizeTextArea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  const submitEntry = async (e) => {
    e.preventDefault();
    try {
      const title = 'Testing Title 1';
      const response = await fetch('http://localhost:5001/entry', {
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title, text: value }),
      });
      if (response.ok) {
        console.log('entry success');
        setValue('');
        if (textAreaRef.current) {
          textAreaRef.current.style.height = 'auto'; 
        }
        props.afterSubmit();
      } else {
        console.error('error');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    setIsActive(false);
  };

  return (
    <>
      {isActive && <div className={styles.backdrop}></div>}
      <div className={`${styles.inputWrapper} ${isActive ? styles.active : ''}`}>
        <textarea
          ref={textAreaRef}
          className={`${styles.titleColorBorder} ${styles.expandedTextArea}`}
          value={value}
          placeholder={"What are you thinking..."}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleTextChange}
        />
        <button className={styles.submitButton} onClick={submitEntry}>Submit</button>
      </div>
    </>
  );
};

export default PromptInput;
