import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { PromptInput } from './components/PromptInput';
import MenuOptions from './components/MenuOptions';
import { WaitlistInput } from './components/WaitlistInput';
import { useState } from 'react';
import { Login } from './components/Login';
import { Main } from './Main';

interface HomeProps {
    userPermission: boolean;
}

export default function Home({ userPermission }: HomeProps) {

    const [hasPermission, setHasPermission] = useState<boolean>(userPermission);

    return (
        <div className={styles.container}>

            <Head>
                <title>Dreams 💭️</title>
            </Head>
            <Main userPermission={false} /> 
        </div>
    );
}