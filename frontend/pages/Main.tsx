import { useState } from 'react';
import styles from '../styles/Home.module.css'
import { Login } from './components/Login';
import { PromptInput } from './components/PromptInput';
import MenuOptions from './components/MenuOptions';
import { WaitlistInput } from './components/WaitlistInput';
import "@fontsource/montserrat";

interface MainProps {
    userPermission: boolean;
}
export const Main = ({ userPermission }: MainProps) => {
    const [hasPermission, setHasPermission] = useState<boolean>(userPermission);
    return (
        <>
            <main className={styles.main}>

            <img src="/dreams2.png" className={styles.image} alt="Dreams" width={450} height={450} />
            <p className={styles.description}>
            Efficiently catalog your dreams in a digital journal. 
            Input your dream details, and we will craft titles, tags, and accompanying images. 
            Most importantly, by recognizing patterns, entities, and recurring motifs, 
            receive insights and delve into the deeper psychological meanings of your dreams. 
            Dive in to explore your subconscious narratives through the power of AI.
            </p>
            {hasPermission ? ( 
                <>
                    <PromptInput 
                        prompt="Tell me about your dream..."
                    /> 
                    <MenuOptions />
                </>
            ) : (
                <Login /> 
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