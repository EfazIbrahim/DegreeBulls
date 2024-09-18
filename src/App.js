import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Auth from './pages/testingAuth';
import StudentNav from './navigation/studentNav';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Auth />} />
                    <Route path="/student/*" element={<StudentNav />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
