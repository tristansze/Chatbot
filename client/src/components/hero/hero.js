import React from 'react';
import styles from "./hero.module.css";
import Robot from "../assets/Robot.png";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className={styles.container} id="hero">
      <div>
        <img src={Robot} alt="Robot png" className={styles.heroImg}></img>
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>Welcome!</h1>
        <p className={styles.description}>My name is Bumper and I am your friendly neighborhood robot! You can ask me any questions you might have pertaining to educational content. I also make it easy for you to host interactive chat rooms where you and your friends can ask me questions and sync together videos for your studying!</p>
        <Link to="/chatroom" className={styles.button}>GET STARTED</Link>
      </div>
    </section>
  )
}