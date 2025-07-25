import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import RegisterPage from "./pages/auth/RegisterPage.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";


function App() {
    return (
        <>
            <Router>
                <div className="app">
                    <Routes>
                        <Route path="/dashoard" element={<Dashboard />} />
                        <Route path="/register" element={<RegisterPage/>}/>
                        <Route path="/login" element={<LoginPage />} />
                    </Routes>
                </div>
            </Router>
        </>
    )
}

export default App
