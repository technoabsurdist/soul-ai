import { useState } from 'react';
import styles from '../styles/Home.module.css'
import Login from './components/Login';
import Home from './components/Home';
import SideNav from './components/SideNav';
import Analysis from './components/Analysis';
import ChatInterface from './components/ChatInterface';
import SignUp from './components/SignUp';
import PromptNewInput from './PromptNewInput';

export enum View {
    HOME,
    ARCHIVE,
    INSIGHTS, 
    CHAT,
    NEW,
    SEARCH,
}

const Main = () => {
    const [hasPermission, setHasPermission] = useState<boolean>(true);
    const [view, setView] = useState<View>(View.HOME);
    const [signup, setSignup] = useState<boolean>(false); 

    const handleUserLogin = () => {
        setHasPermission(true);
    }

    const handleSetView = (view: View) => {
        setView(view);
    }

    return (
        <>
            <main className={styles.main}>

            {hasPermission ? ( 
                <>
                    <div className={styles.navbar2}>
                        <SideNav handleSetView={handleSetView} /> 
                    </div>
                    {view === View.HOME && <Home />}
                    {view === View.NEW && <PromptNewInput />}
                    {view === View.INSIGHTS && <Analysis />}
                    {view === View.CHAT && <ChatInterface /> }
                </>
                 
            ) : (
                <>
                <img src="/dreams2.png" className={styles.image} alt="Dreams" width={450} height={450} />
                <p className={styles.description}>
                <span>
                    Explore the complex landscape of your mind through profound analysis of your thoughts and feelings. <br /> 
                </span>
                <span>
                    Contribute any thought, dream, journey, or emotion to our AI-fueled journal, be it vague or elaborate. <br /> 
                </span>
                <span>
                    Leveraging advanced NLP algorithms, we organize your thoughts and pinpoint behavioral patterns. <br /> 
                </span>
                <span>
                Most importantly, we decode your subconscious, offering a clearer understanding of your inner realm. <br />
                </span>
                </p>
                {!signup ? (
                    <>
                        <Login handleUserLogin={handleUserLogin} />
                    <div className={styles.divBottom}>
                        <a onClick={() => setSignup(true)} className={styles.waitlistAndSignup}>Sign Up</a>
                    </div>
                    </>
                ) : (
                    <SignUp handleUserLogin={handleUserLogin}/>
                )} 
                </>
            )}
            </main>
            <style jsx>{`
                    main {
                    padding: 5rem 0;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    }
                    code {
                    background: #fafafa;
                    border-radius: 5px;
                    padding: 0.75rem;
                    font-size: 1.1rem;
                    font-family:
                        Montserrat,
                        Roboto,
                        Menlo,
                        Monaco,
                        Lucida Console,
                        Liberation Mono,
                        DejaVu Sans Mono,
                        Bitstream Vera Sans Mono,
                        Courier New,
                        monospace;
                    }
                `}</style>
        
            <style jsx global>{`
                    html,
                    body {
                    padding: 0;
                    margin: 0;
                    font-family:
                        -apple-system,
                        BlinkMacSystemFont,
                        Segoe UI,
                        Roboto,
                        Oxygen,
                        Ubuntu,
                        Cantarell,
                        Fira Sans,
                        Droid Sans,
                        Helvetica Neue,
                        sans-serif;
                    }
                    * {
                    box-sizing: border-box;
                    }
                `}</style>
        </>
    )
}

export default Main;