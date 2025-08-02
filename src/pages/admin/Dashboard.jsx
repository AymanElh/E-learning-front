import SummaryCard from "../../components/common/SummaryCard.jsx";
import CourseAdminCard from "../../components/common/CourseAdminCard.jsx";
import {BookIcon, DollarSignIcon, FolderIcon, PlusIcon, UserIcon, UsersIcon} from "lucide-react";
import AdminLayout from "../../components/layout/admin/AdminLayout.jsx";

function Dashboard() {
    // Sample categories data for testing
    const categories = [
        { name: "Programming", courses: 45 },
        { name: "Design", courses: 28 },
        { name: "Marketing", courses: 15 },
        { name: "Business", courses: 22 },
        { name: "Photography", courses: 10 },
    ];
    return (
        <AdminLayout>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <SummaryCard title="Total Courses" value="124" icon={<BookIcon/>}/>
                <SummaryCard title="Categories" value="18" icon={<FolderIcon/>}/>
                <SummaryCard title="Total Enrollments" value="2,847" icon={<UsersIcon/>}/>
                <SummaryCard title="Revenue" value="$45,280" icon={<DollarSignIcon/>}/>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mt-8">
                <section className="shadow-xl p-3 lg:col-span-2 rounded-xl">
                    <div className="flex  justify-between p-2">
                        <h2 className="text-3xl font-bold ">Courses Managements</h2>
                        <button className="bg-purple-800 flex items-center gap-2 px-4 py-2 rounded cursor-pointer">
                            <PlusIcon className="h-4 w-4"/>
                            Add Course
                        </button>
                    </div>
                    <div className="p-2 flex flex-col gap-3">
                        <CourseAdminCard title="React Foundamentals" category="Programming" price="200" students="40"/>
                        <CourseAdminCard title="React Foundamentals" category="Programming" price="200" students="40"/>
                        <CourseAdminCard title="React Foundamentals" category="Programming" price="200" students="40"/>
                        <CourseAdminCard title="React Foundamentals" category="Programming" price="200" students="40"/>

                    </div>
                </section>
                <section className="shadow px-2 py-4 lg:col-span-1 rounded-xl bg-gray-800">
                    <h2 className="text-3xl font-bold mb-8">Categories</h2>
                    <div className="flex flex-col gap-5">
                        {categories && categories.map((category) => {
                            return (
                                <div className="flex justify-between p-5 border-1 rounded-lg">
                                    <p className="text-lg font-semibold">{category.name}</p>
                                    <p className="">{category.courses} courses</p>
                                </div>
                            )
                        })}

                    </div>
                </section>
            </div>
        </AdminLayout>
    );
}

export default Dashboard;