import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import RegisterPage from "./pages/auth/RegisterPage.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import CourseList from "./pages/admin/courses/CourseList.jsx";
import Home from "./pages/Home.jsx";
import CreateCourse from "./pages/admin/courses/CreateCourse.jsx";
import EditCourse from "./pages/admin/courses/EditCourse.jsx";
import CategoryList from "./pages/admin/categories/CategoryList.jsx";
import EnrollmentList from "./pages/Enrollments/EnrollmentList.jsx";


function App() {
    return (
        <>
            <Router>
                <div className="app">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/admin/courses" element={<CourseList />} />
                        <Route path="/admin/courses/create" element={<CreateCourse />} />
                        <Route path="/admin/courses/:id/edit" element={<EditCourse />} />
                        <Route path="/admin/categories" element={<CategoryList />} />
                        <Route path="/admin/enrollments" element={<EnrollmentList />} />
                        <Route path="/register" element={<RegisterPage/>}/>
                        <Route path="/login" element={<LoginPage />} />
                    </Routes>
                </div>
            </Router>
        </>
    )
}

export default App
