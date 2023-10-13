import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import Main from './Main';

export default function Home() {

    return (
        <div className={styles.container}>

            <Head>
                <title>Dreams 💭️</title>
            </Head>
            <Main /> 
        </div>
    );
}