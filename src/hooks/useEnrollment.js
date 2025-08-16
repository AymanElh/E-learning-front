import {useEffect, useState} from "react";
import {useAuth} from "../contexts/AuthContext.jsx";
import api from '../services/api.js'

export const useEnrollment = function (courseId) {
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {token, isAuthenticated, loading: authLoading} = useAuth();

    useEffect(() => {
        const checkEnrollment = async function () {
            if(authLoading) {
                return;
            }

            if(!isAuthenticated()) {
                setIsEnrolled(false);
                setLoading(false);
                setError(null);
                return;
            }

            if(!courseId) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                const response = await api.get(`/courses/${courseId}/enrollment-status`);
                if(response.status === 200) {
                    const data = response.data;
                    setIsEnrolled(data.is_enrolled || false);
                }
            }
            catch (err) {
                console.error("Enrollment check error: ", err);
                setError(err?.response?.data?.message || "Failed to check enrollment status");
                setIsEnrolled(false);
            } finally {
                setLoading(false);
            }
        }

        checkEnrollment();
    }, [courseId, token, isAuthenticated, authLoading]);

    async function enrollInCourse(courseId) {
        if(!isAuthenticated()) {
            throw new Error("Please login to enroll this course");
        }

        try {
            const response = await api.post(`/courses/${courseId}/enroll`)

            if(response.status === 200) {
                const data = response.data;
                setIsEnrolled(true);
                return data;
            }

        } catch(err) {
            console.error("Enrollment error: ", err);
            const errorMessage = err.response?.data?.message || 'Enrollment failed';
            throw new Error(errorMessage);
        }
    }

    return {
        isEnrolled,
        loading,
        error,
        enrollInCourse,
    }
}
