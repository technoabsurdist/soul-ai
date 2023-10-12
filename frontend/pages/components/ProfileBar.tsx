import Link from 'next/link';
import React from 'react';
import styles from '../../styles/Home.module.css';

const ProfileBar = () => {
    return (
        <div className={styles.navbarParent}>
            <div>
                {/* <Link className={styles.profileItem} href="">Admin</Link> */}
            </div>
            <div>
                <Link className={styles.profileItem} href="">admin@example.com</Link>
            </div>
            <div>
                {/* <Link className={styles.profileItem} href="">About</Link> */}
            </div>
        </div>
        
    )
}

export default ProfileBar
