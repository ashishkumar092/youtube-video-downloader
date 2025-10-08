import Navbar from '../src/components/Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavRouter from './routes/Router';
import Home from './pages/Home';
import About from './pages/About';
import './App.css'
import Sdownloader from './pages/Sdownloader';

function App() {


  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/yt-downloader" element={<Sdownloader/>}/>
        {/* <Route path="/playlist" element={<PlaylistDownloader />} /> */}
      </Routes>
    </Router>
  )

}

export default App
