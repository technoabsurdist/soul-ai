import React, { useState } from 'react';
import styles from "../../styles/Home.module.css"
import PromptInput from './PromptInput';
import BottomHomePage from './BottomHomePage';

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
                {/* <BottomHomePage /> */}
            </div>
        </>
       
    );
};

export default Home;
