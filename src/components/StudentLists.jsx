import { TbClipboardList } from "react-icons/tb";
import StudentStats from "./StudentStats";

const StudentLists = () => {

    const college_id = localStorage.getItem("college_id");

    const handleStudentsRequest = async () => {
        try {
            let studsResponse = await fetch(`http://127.0.0.1:8000/api/attendance/attendance-by-college/${college_id}`, {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            });
        } catch (err) {
            console.log(err);
        }

    }

    return (
        <div className="flex flex-col py-6 gap-3">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold">List of Attendees</h1>
                <button className="flex items-center gap-2 border p-1 px-4 rounded-full text-sm text-white bg-primOrange h-10">Convert List of PDF <TbClipboardList size={16} /></button>
            </div>
            <div className="flex items-center gap-4 text-gray-700">
                <h1 className="cursor-pointer">All Students</h1>
                <h1 className="cursor-pointer">Active Students</h1>
                <h1 className="cursor-pointer">Inactive Students</h1>
                {/* <input type="text" placeholder="Search student" className="p-1 px-4 border rounded-full text-sm" /> */}
            </div>
            <hr />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-purple -200 bg-gray-200">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Student ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                First Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Last Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Program
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Year
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Time In
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Time Out
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Time Rendered
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Designator
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <StudentStats />
                        <StudentStats />
                        <StudentStats />
                        <StudentStats />
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentLists;