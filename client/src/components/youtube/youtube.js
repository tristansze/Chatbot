import React from 'react';
import styles from "./youtube.module.css";
import Robot from "../assets/Robot.png";
import YTlogo from "../assets/YTlogo.png";
import { Link } from "react-router-dom";

export const Youtube = () => {
  return (
    <section className={styles.container}>
      <div className={styles.imagesrow}>
        <img src={Robot} alt="Robot png" className={styles.heroImg}></img>
        <img src={YTlogo} alt="Youtube logo" className={styles.Youtube}></img>
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>Study with Friends!</h1>
        <p className={styles.description}>Bumper makes cramming review videos together easier than ever before! Create a room or join an existing one to enjoy a seamless and synchronized viewing experience for your educational benefit. Click one of the buttons below to get started!</p>
        <div className={styles.buttonrow}>
            <Link to="/host" className={styles.hostbutton}>HOST A ROOM</Link>
            <Link to="/join" className={styles.joinbutton}>JOIN A ROOM</Link>
        </div>
      </div>
    </section>
  )
}
