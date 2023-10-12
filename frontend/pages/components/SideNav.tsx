import Link from 'next/link';
import React from 'react';
import styles from '../../styles/Home.module.css';

const SideNav = () => {
    return (
        <div className={styles.navbarParent}>
            <div>
                <Link className={styles.navbarItem} href="">All Dreams</Link>
            </div>
            <div>
                <Link className={styles.navbarItem} href="">Analysis</Link>
            </div>
            <div>
                <Link className={styles.navbarItem} href="">About</Link>
            </div>
        </div>
        
    )
}

export default SideNav