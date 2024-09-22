import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Auth from './pages/testingAuth';
import StudentNav from './navigation/studentNav';
import AdvisorNav from './navigation/advisorNav';
import StaffNav from './navigation/staffNav';
import InstructorNav from './navigation/instructorNav';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Auth />} />
                    <Route path="/student/*" element={<StudentNav />} />
                    <Route path ="/advisor/*" element={<AdvisorNav />} />
                    <Route path ="/staff/*" element={<StaffNav />} />
                    <Route path ="/instructor/*" element={<InstructorNav />} />
                </Routes>
            </div>
        </Router>
    );
}
// salam
export default App;
