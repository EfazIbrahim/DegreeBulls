import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/studentHome';
import Gpa from './pages/studentGpa';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <nav>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/gpa">GPA</Link>
                    </li>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/gpa" element={<Gpa />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
