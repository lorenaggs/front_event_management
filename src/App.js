import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Eventos from './pages/Eventos';
import Ubicaciones from './pages/Ubicaciones';
import Contactos from './pages/Contactos';
import Footer from "./components/Footer";

function App() {
    return (
        <Router>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/eventos" element={<Eventos />} />
                    <Route path="/ubicaciones" element={<Ubicaciones />} />
                    <Route path="/contactos" element={<Contactos />} />
                </Routes>
            </div>
            <Footer />
        </Router>
    );
}

export default App;
