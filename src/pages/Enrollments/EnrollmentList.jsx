import AdminLayout from "../../components/layout/admin/AdminLayout.jsx";
import {useEffect, useState} from "react";
import {enrollmentService} from "../../services/enrollmentService.js";
import Spinner from "../../components/common/Spinner.jsx";
import ErrorMessage from "../../components/common/ErrorMessage.jsx";
import moment from "moment/moment.js";


function EnrollmentList() {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchEnrollments();
    }, []);

    async function fetchEnrollments() {
        setLoading(true);
        setError("");

        try {
            const result = await enrollmentService.getAllEnrollments();
            console.log(result);
            if (result.success) {
                setEnrollments(result.data);
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <AdminLayout>
                <div className="h-screen flex justify-center items-center p-6">
                    <Spinner/>
                </div>
            </AdminLayout>
        )
    }

    return (
        <AdminLayout>
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="p-4 sm:p-6 border-b border-gray-700">
                    <h2 className="text-xl font-bold text-white">Enrollments</h2>
                </div>

                {error && (
                    <div className="p-4">
                        <ErrorMessage message={error} onClose={() => setError('')}/>
                    </div>
                )}

                <div>
                    <div className="overflow-x-auto">
                        <table className="bg-gray-700 w-full text-left text-md text-gray-300">
                            <thead className="text-gray-400 bg-gray-700">
                            <tr>
                                <th className="px-6 py-3">ID</th>
                                <th className="px-6 py-3">Course name</th>
                                <th className="px-6 py-3">User name/email</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Enrollment date</th>
                            </tr>
                            </thead>
                            <tbody>
                            {enrollments && enrollments.map(enrollment => (
                                <tr key={enrollment.id}
                                    className="bg-gray-800 border-b border-gray-700 hover:bg-gray-750 transition-colors">
                                    <td className="px-6 py-4">{enrollment.id}</td>
                                    <td className="px-6 py-4">{enrollment.course.title}</td>
                                    <td className="px-6 py-4">
                                        {enrollment.user.name} / {enrollment.user.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium  ${
                                                enrollment.status === 'accepted' ? 'bg-green-900 text-green-300' :
                                                    enrollment.status === 'pending' ? 'bg-yellow-900 text-yellow-300' :
                                                        'bg-red-900 text-red-300'
                                            }`}>
                                            {enrollment.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{moment(enrollment.created_at).format("MMMM Do YYYY")}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default EnrollmentList;