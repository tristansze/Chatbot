import React from 'react';
import styles from "./join.module.css";
import { useNavigate } from "react-router-dom";
import Robot from "../assets/Robot.png";


export const Join = () => {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const username = event.target.username.value;
        const roomCode = event.target.password.value;
        const messageElement = document.getElementById('message');

        navigate('/youtuberoom', { state: { username, roomCode } });
    }

    return (
        <section className={styles.container}>
            <div className={styles.row}>
                <h1 className={styles.header}>Join Room</h1>
                <img src={Robot} alt="Robot png" className={styles.robotImg}></img>
            </div>
            <form id="joinForm" onSubmit={handleSubmit}>
                <div className={styles.textbox}>
                    <input type="text" placeholder="Username" id="username" name="username" required />
                </div>
                <div className={styles.textbox}>
                    <input type="password" placeholder="Room Code" id="password" name="password" required />
                </div>
                <input type="submit" className={styles.btn} value="Enter" />
            </form>
            <p id="message"></p>
        </section>
    );
};

