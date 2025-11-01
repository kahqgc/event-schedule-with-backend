import { HashRouter as Router, Routes, Route } from 'react-router'
import Home from "./pages/Home";
import About from './pages/About';
import Schedule from './features/schedule/pages/Schedule'
import Header from './layout/Header/Header';
import Footer from './layout/Footer/Footer';
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
