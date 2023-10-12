import React from 'react';
import styles from "../styles/HomePage.module.css"

const Home = () => {
    return (
        <div className={styles.container}>
            <nav className={styles.navbar}>
                <button className={styles.newNoteBtn}>Create New Note</button>
                <div className={styles.navOptions}>
                    <button className={styles.navBtn}>All Notes</button>
                    <button className={styles.navBtn}>Starred</button>
                    <button className={styles.navBtn}>Archived</button>
                    <button className={styles.navBtn}>Settings</button>
                </div>
            </nav>
            <main className={styles.mainContent}>
                <h1>Welcome!</h1>
                <p>You are now logged in.</p>
            </main>
        </div>
    );
};

export default Home;
