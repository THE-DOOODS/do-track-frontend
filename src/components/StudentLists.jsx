import { TbClipboardList } from "react-icons/tb";
import StudentStats from "./StudentStats";
import { useState, useEffect } from "react";

const StudentLists = () => {
    const college_id = localStorage.getItem("college_id");

    const [collegeAttend, setCollegeAttend] = useState([]);

    const handleAttendCollegeRequest = async () => {
        try {
            let response = await fetch(`http://do-track-backend-production.up.railway.app/api/attendance/attendance-by-college/${college_id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                setCollegeAttend(data?.data);
            }
        } catch (err) {
            console.log("Unable to fetch attendance by college");
        }
    };

    useEffect(() => {
        handleAttendCollegeRequest();
    }, [])

    return (
        <div className="flex flex-col py-4 gap-3">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-gray-600">List of Attendees</h1>
                <button className="flex items-center gap-2 border p-1 px-4 rounded-full text-sm text-white bg-primOrange h-10">Convert List of PDF <TbClipboardList size={16} /></button>
            </div>
            <div className="flex items-center gap-4 text-gray-700">
                <h1 className="cursor-pointer text-primPurple font-bold">All Students</h1>
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
                        <StudentStats collegeAttend={collegeAttend} />
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentLists;