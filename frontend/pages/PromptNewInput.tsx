import React, { useEffect, useRef, useState } from 'react';
import Archive from "./components/Archive";
import styles from "./PromptNewInput.module.css";

const PromptNewInput = (props) => {
    const [value, setValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        setIsFocused(true);
      }
    }, []);

    const handleFocus = () => {
        setIsFocused(true);
    }

    const handleBlur = () => {
        setIsFocused(false);
    }

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
            props.afterSubmit();
          } else {
            console.error('error');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

    return (
        <>
            <div className={isFocused ? styles.overlay : ''}>
            <input
                ref={inputRef}
                className={styles.input}
                placeholder="What are you thinking..."
                onFocus={handleFocus}
                onBlur={handleBlur}
                onSubmit={submitEntry}
            />
            <button className={styles.submitButton} onClick={submitEntry}>Submit</button>
            </div>
            <Archive reload={undefined} />
        </>
    );
}

export default PromptNewInput;
