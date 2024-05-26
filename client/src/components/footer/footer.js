import React from 'react'
import Email from "../assets/emailIcon.png"
import Linked from "../assets/linkedinIcon.png"
import Github from "../assets/githubIcon.png"
import styles from "./footer.module.css"

export const Footer = () => {
  return (
    <footer className={styles.container} id="contact">
        <div className={styles.text}>
            <h2>Feel free to contact me!</h2>
            <p>I would love to hear any feedback or suggestions you may have!</p>
        </div>
        <ul className={styles.links}>
            <li className={styles.link}>
                <img src={ Email } alt="Email"></img>
                <a href="mailto:tsze@purdue.edu">tsze@purdue.edu</a>
            </li>
            <li className={styles.link}>
                <img src={ Linked }  alt="Linkedin Icon"></img>
                <a href="https://www.linkedin.com/in/tristan-sze-57583926b/">LinkedIn</a>
            </li>
            <li className={styles.link}>
                <img src={ Github } alt="Git Icon"></img>
                <a href="https://www.github.com/tristansze">GitHub</a>
            </li>
        </ul>
    </footer>
  )
}

