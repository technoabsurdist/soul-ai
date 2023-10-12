import React from 'react';
import styles from "../../styles/Home.module.css"
import PromptInput from './PromptInput';

const Home = () => {
    return (
        <>
                <main className={styles.mainContent}>
                    <PromptInput 
                        prompt="Tell me about your dream..."
                    /> 
                </main>
        </>
       
    );
};

export default Home;
