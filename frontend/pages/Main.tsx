import { useState } from 'react';
import styles from '../styles/Home.module.css'
import Login from './components/Login';
import Home from './components/Home';
import SideNav from './components/SideNav';
import ProfileBar from './components/ProfileBar';

interface MainProps {
    userPermission: boolean;
}

const Main = ({ userPermission }: MainProps) => {
    const [hasPermission, setHasPermission] = useState<boolean>(userPermission);

    const handleUserLogin = (email: string, password: string) => {
        setHasPermission(true);
    }
    return (
        <>
            <main className={styles.main}>

            {hasPermission ? ( 
                <>
                    <div className={styles.navbar2}>
                        <SideNav /> 
                    </div>
                    <Home />
                    <div className={styles.navbarProfile}>
                        <ProfileBar /> 
                    </div>
                </>
                 
            ) : (
                <>
                <img src="/dreams2.png" className={styles.image} alt="Dreams" width={450} height={450} />
                <p className={styles.description}>
                <span>
                    Dive into the intricate tapestry of your mind by analyzing dream motifs and patterns. <br /> 
                </span>
                <span>
                    Input a dream into our AI-powered journal, no matter how vague or detailed. <br />
                </span>
                <span>
                    Leveraging cutting-edge natural language processing, we identify patterns, highlight 
                </span>
                <span>
                    recurring motifs, and categorize them with precise titles, tags, and visuals. <br />  
                </span>
                <span>
                    Unravel your inner narratives through the lens of AI.
                </span>
                </p>
                <Login 
                    handleUserLogin={handleUserLogin}
                /> 
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