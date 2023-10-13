import React, { useState } from 'react';
import styles from "../../styles/Home.module.css"
import PromptInput from './PromptInput';

const Home = () => {

    const [showPrompt, setShowPrompt] = useState(true)

    return (
        <>
            <main className={styles.mainContent}>
                {showPrompt && <PromptInput 
                    prompt="Tell me about your dream..."
                />}
            </main>
            <div>
            </div>
        </>
       
    );
};

export default Home;
