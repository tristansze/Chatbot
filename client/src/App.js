import styles from "./App.module.css";
import { Navbar } from "./components/navbar/navbar";

function App() {
  return (
    <div className={styles.app}> 
      <Navbar />
    </div>
  );
};

export default App;
