import React from 'react';
import { Link } from 'react-router-dom';
import styles from './home.module.css';

const HomePage = () => {
    return (
        <div className={styles.homePage}>
            {/* Hero Section */}
            <section className={styles.heroSection}>
                <h1 className={styles.heroTitle}>Welcome to Artist Hub</h1>
                <p className={styles.heroText}>
                    Discover incredible artists, explore their work, and hire them for your next project.
                </p>
                <Link to="/artists" className={styles.exploreButton}>
                    Explore Artists
                </Link>
            </section>

            {/* Featured Artists Section */}
            <section className={styles.featuredArtists}>
                <h2 className={styles.sectionTitle}>Featured Artists</h2>
                <div className={styles.artistList}>
                    {/* Example Artist Cards */}
                    <div className={styles.artistCard}>
                        <img
                            src="https://images.unsplash.com/photo-1585076800246-4562eb6d6f42?q=80&w=1963&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Artist"
                            className={styles.artistImage}
                        />
                        <h3 className={styles.artistName}>John Doe</h3>
                        <p className={styles.artistSpecialty}>Painter</p>
                        <Link to="/artists/john-doe" className={styles.artistLink}>
                            View Profile
                        </Link>
                    </div>
                    <div className={styles.artistCard}>
                        <img
                            src="https://images.unsplash.com/photo-1648536426233-29776d89d6f3?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Artist"
                            className={styles.artistImage}
                        />
                        <h3 className={styles.artistName}>Jane Smith</h3>
                        <p className={styles.artistSpecialty}>Sculptor</p>
                        <Link to="/artists/jane-smith" className={styles.artistLink}>
                            View Profile
                        </Link>
                    </div>
                    {/* Add more artist cards as needed */}
                </div>
            </section>

            {/* Call to Action */}
            <section className={styles.ctaSection}>
                <h2 className={styles.ctaTitle}>Looking for an Artist?</h2>
                <p className={styles.ctaText}>Browse our gallery of talented artists and hire the best for your needs!</p>
                <Link to="/artists" className={styles.ctaButton}>
                    Browse Artists
                </Link>
            </section>
        </div>
    );
};

export default HomePage;




// import { Link } from "react-router-dom"

// function Home(){
    
//     return(
//         <>
//         <h1>This is Home Page</h1>
//         <Link to='/artists'>Artist List</Link>
//         <Link to='/register'>Register</Link>
//         <Link to='/login'>Login</Link>
//         </>
//     )
// };
// export default Home