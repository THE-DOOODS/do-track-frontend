import { useEffect, useState } from "react";


const StudentStats = ({collegeAttend}) => {
    
    const [attendData, setAttendData] = useState([]);

    useEffect(() => {
        setAttendData(collegeAttend);
    }, [collegeAttend]);

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
                        {data?.total_hours}
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