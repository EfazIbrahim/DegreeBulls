// degreebulls/src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import Auth from './pages/testingAuth';
import StudentNav from './navigation/studentNav';
import AdvisorNav from './navigation/advisorNav';
import StaffNav from './navigation/staffNav';
import InstructorNav from './navigation/instructorNav';
import AdminNav from "./navigation/adminNav";
import './App.css';
import { AuthProvider } from './context/AuthContext';
import store from './redux/store';

function App() {
    return (
        <AuthProvider>
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Routes>
                            <Route path="/" element={<Auth />} />
                            <Route path="/student/*" element={<StudentNav />} />
                            <Route path="/advisor/*" element={<AdvisorNav />} />
                            <Route path="/staff/*" element={<StaffNav />} />
                            <Route path="/instructor/*" element={<InstructorNav />} />
                            <Route path="/admin/*" element={<AdminNav />} />
                        </Routes>
                    </div>
                </Router>
            </Provider>
        </AuthProvider>
    );
}

export default App;