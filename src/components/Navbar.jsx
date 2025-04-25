import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './navbar.module.css'; // Import the CSS module for styling

const Navbar = () => {
    // State to manage the mobile menu visibility
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarContainer}>
                <Link to="/" className={styles.navbarLogo}>
                    Artist Hub
                </Link>
                <div className={styles.navbarToggle} onClick={toggleMobileMenu}>
                    <span className={styles.bar} />
                    <span className={styles.bar} />
                    <span className={styles.bar} />
                </div>
                <ul className={`${styles.navbarMenu} ${isMobileMenuOpen ? styles.active : ''}`}>
                    <li className={styles.navbarItem}>
                        <Link to="/" className={styles.navbarLinks}>Home</Link>
                    </li>
                    <li className={styles.navbarItem}>
                        <Link to="/artists" className={styles.navbarLinks}>Artists</Link>
                    </li>
                    <li className={styles.navbarItem}>
                    <Link to="/bookings" className={styles.navbarLinks}>View Bookings</Link>
                    </li>
                    <li className={styles.navbarItem}>
                    <Link to="/admin/bookings" className={styles.navbarLinks}>Admin Bookings</Link>
                    </li>
                    <li className={styles.navbarItem}>
                    <Link to="/my-bookings" className={styles.navbarLinks}>My Bookings</Link>
                    </li>
                    <li className={styles.navbarItem}>
                        <Link to="/login" className={styles.navbarLinks}>Login</Link>
                    </li>
                    <li className={styles.navbarItem}>
                        <Link to="/register" className={styles.navbarLinks}>Register</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
