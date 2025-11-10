import { HashRouter as Router, Routes, Route } from 'react-router'
import Home from "./pages/Home";
import About from './pages/About';
import './App.css';
import Schedule from './features/schedule/pages/Schedule';
import Header from './layout/Header/Header';
import Footer from './layout/Footer/Footer';

function App() {


  return (
    <>
        <Router>
          <div id="app">
            {/* persistent header at the top of every page */}
            <Header />
            <main className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/schedule" element={<Schedule />} />
              </Routes>
            </main>
            {/* persistent footer at the bottom of every page */}
            <Footer />
          </div>
        </Router>
    </>
  )
}

export default App
