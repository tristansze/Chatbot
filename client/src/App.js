import styles from "./App.module.css";
import { Navbar } from "./components/navbar/navbar";
import { Hero } from "./components/hero/hero";
import { Room } from "./components/chatroom/chatroom";
import { Youtube } from "./components/youtube/youtube";
import { Footer } from "./components/footer/footer";
import { Join } from "./components/join/join";
import { Host } from "./components/host/host";
import { YoutubeRoom } from "./components/youtuberoom/youtuberoom";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className={styles.app}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/chatroom" element={<Room />} />
        <Route path="/youtube" element={<Youtube />} />
        <Route path="/host" element={<Host />} />
        <Route path="/join" element={<Join />} />
        <Route path="/youtuberoom" element={<YoutubeRoom />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
