import {useEffect, useState, useCallback} from "react";
import {useAuth} from "../contexts/AuthContext.jsx";
import api from '../services/api.js'

export const useEnrollment = function (courseId) {
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {token, isAuthenticated, loading: authLoading} = useAuth();

    const parseEnrollment = (payload) => {
        // Support multiple API shapes: boolean, {is_enrolled}, {isEnrolled}, {data:{...}}
        if (typeof payload === 'boolean') return payload;
        if (payload && typeof payload.is_enrolled === 'boolean') return payload.is_enrolled;
        if (payload && typeof payload.isEnrolled === 'boolean') return payload.isEnrolled;
        if (payload && payload.data) {
            const d = payload.data;
            if (typeof d === 'boolean') return d;
            if (typeof d.is_enrolled === 'boolean') return d.is_enrolled;
            if (typeof d.isEnrolled === 'boolean') return d.isEnrolled;
        }
        return false;
    }

    const checkEnrollment = useCallback(async () => {
        if (authLoading) {
            // wait for auth to resolve
            return;
        }

        if (!isAuthenticated()) {
            setIsEnrolled(false);
            setLoading(false);
            setError(null);
            return;
        }

        if (!courseId) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const response = await api.get(`/courses/${courseId}/enrollment-status`);
            if (response.status === 200) {
                const enrolled = parseEnrollment(response.data);
                setIsEnrolled(!!enrolled);
            } else {
                setIsEnrolled(false);
            }
        }
        catch (err) {
            console.error("Enrollment check error: ", err);
            setError(err?.response?.data?.message || "Failed to check enrollment status");
            setIsEnrolled(false);
        } finally {
            setLoading(false);
        }
    }, [authLoading, courseId, isAuthenticated, token]);

    useEffect(() => {
        checkEnrollment();
    }, [checkEnrollment]);

    async function enrollInCourse(courseId) {
        if (!isAuthenticated()) {
            throw new Error("Please login to enroll this course");
        }

        try {
            const response = await api.post(`/courses/${courseId}/enroll`)

            if (response.status === 200) {
                // Optimistically set enrolled. We also allow consumers to refetch if needed.
                setIsEnrolled(true);
                return response.data;
            }

            throw new Error('Enrollment failed');
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
        refetch: checkEnrollment,
    }
}
