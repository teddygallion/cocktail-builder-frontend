import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Landing.module.css';
import LandingImage from '../../assets/images/LandingImage.png'; 


const Landing = () => {
    return (
      <div className={styles.container}>
        <section className={styles.rightSide}>
          <h1>Welcome to Cocktail Builder!</h1>
          <p>Build and discover drinks you love</p>
          <div className={styles.buttonGroup}>
            <Link className={styles.ctaButton} to="/sign-in">Sign In</Link>
            <Link className={styles.ctaButtonSecondary} to="/sign-up">Sign Up</Link>
          </div>
        </section>
  
        <section
          className={styles.leftSide}
          style={{ backgroundImage: `url(${LandingImage})` }}
        ></section>
      </div>
    );
  };
  
  export default Landing;