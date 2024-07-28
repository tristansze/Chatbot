import React, { useState } from "react";
import styles from "./navbar.module.css";
import { getImageUrl } from "../../utils";
import Title from "../assets/SubLogo.png";
import { Link } from "react-router-dom";

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <nav className={styles.navbar}>
            <Link to="/" className={styles.title}>
                <img src={Title} alt="Logo" className={styles.title} />
            </Link>
            <div className={styles.menu}>
                <img className={styles.menuBtn}
                src={
                    menuOpen
                        ? getImageUrl("nav/closeIcon.png")
                        : getImageUrl("nav/menuIcon.png")
                } 
                alt="menu-button"
                onClick={() => setMenuOpen(!menuOpen)}
                />
                <ul className={`${styles.menuItems} ${menuOpen && styles.menuOpen}`}
                onClick={() => setMenuOpen(false)}>
                    <li>
                        <Link to="/chatroom">Chatroom</Link>
                    </li>
                    <li>
                        <Link to="/youtube">Video Linker</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}