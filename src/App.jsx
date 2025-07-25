import Header from "./components/common/Header.jsx";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Footer from "./components/common/Footer.jsx";
import RegisterPage from "./pages/auth/RegisterPage.jsx";


function App() {
    return (
        <>
            <Router>
                <div className="app">
                    <Routes>
                        <Route path="/register" element={<RegisterPage/>}/>
                    </Routes>
                </div>
            </Router>
        </>
    )
}

export default App
