import { HashRouter as Router, Routes, Route } from 'react-router'
import Home from "./pages/Home";
import About from './pages/About';
import Schedule from './pages/Schedule'
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import './App.css';

function App() {


  return (
    <>
        <Router>
          <div id="app">
            {/* persistent header at the top of every page */}
            <Header />
            <div className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pages/About" element={<About />} />
                <Route path="/pages/Schedule" element={<Schedule />} />
              </Routes>
            </div>
            {/* persistent footer at the bottom of every page */}
            <Footer />
          </div>
        </Router>
    </>
  )
}

export default App
