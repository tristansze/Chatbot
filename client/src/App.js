import styles from "./App.module.css";
import { Navbar } from "./components/navbar/navbar";
import { Hero } from "./components/hero/hero";
import { Room } from "./components/chatroom/chatroom";
import { Youtube } from "./components/youtube/youtube";
import { Footer } from "./components/footer/footer";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className={styles.app}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/chatroom" element={<Room />} />
        <Route path="/youtube" element={<Youtube />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
