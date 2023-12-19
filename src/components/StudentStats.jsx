import { useEffect, useState } from "react";


const StudentStats = ({collegeAttend, programAttend, selectedProgram, allStudents}) => {
    
    const [attendData, setAttendData] = useState([]);

    useEffect(() => {
        if (allStudents) {
            setAttendData(collegeAttend);
        } else if (selectedProgram) {
            setAttendData(programAttend);
        } else {
            setAttendData(collegeAttend);
        }
        // setAttendData(!selectedProgram ? collegeAttend : programAttend);
    }, [collegeAttend, programAttend, selectedProgram, allStudents]);

    const formatHours = (totalHours) => {
        const hours = Math.floor(totalHours);
        const minutes = Math.round((totalHours - hours) * 60);
        return `${hours}:${String(minutes).padStart(2, '0')}`;
    };

    return (
        <tbody> 
            {attendData?.map((data, key) => (
                <tr key={key} className="bg-white border-b hover:bg-gray-200 text-xs    ">
                    <td scope="row" className="px-6 py-4 font-medium  whitespace-nowrap">
                        {data?.student_id}
                    </td>
                    <td className="px-6 py-4">
                        {data?.student_first_name}
                    </td>
                    <td className="px-6 py-4">
                        {data?.student_last_name}
                    </td>
                    <td className="px-6 py-4">
                        {data?.program_name}
                    </td>
                    <td className="px-6 py-4">
                        {data?.year_level_code}
                    </td>
                    <td className="px-6 py-4">
                        {new Date(data?.time_in).toLocaleDateString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                            month: "long",
                            day: "2-digit",
                            year: "numeric",
                        })}
                    </td>
                    <td className="px-6 py-4">
                        {data?.time_out && new Date(data?.time_out).toLocaleDateString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                            month: "long",
                            day: "2-digit",
                            year: "numeric",
                        })}
                    </td>
                    <td className="px-6 py-4">
                        {formatHours(data?.total_hours)} hrs
                    </td>
                    <td className="px-6 py-4">
                        {data?.admin_first_name} {data?.admin_last_name}
                    </td>
                </tr>
            ))}
        </tbody>
    );
};

export default StudentStats;