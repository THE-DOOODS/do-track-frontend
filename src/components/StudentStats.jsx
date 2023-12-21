import { useEffect, useState } from "react";
import "../index.css";

const StudentStats = ({ paginatedData }) => {
	const formatHours = (totalHours) => {
		const hours = Math.floor(totalHours);
		const minutes = Math.round((totalHours - hours) * 60);
		return `${hours}:${String(minutes).padStart(2, "0")}`;
	};

	return (
		<tbody>
			{paginatedData.map((data, key) => (
				<tr
					key={key}
					className="bg-white border-b border-l border-r hover:bg-gray-200 text-xs    ">
					<td scope="row" className="px-6 py-4 font-medium  whitespace-nowrap">
						{data?.student_id}
					</td>
					<td className="px-6 py-4">{data?.student_first_name}</td>
					<td className="px-6 py-4">{data?.student_last_name}</td>
					<td className="px-6 py-4">{data?.program_name}</td>
					<td className="px-6 py-4">{data?.year_level_code}</td>
					<td className="py-4 flex items-center justify-center">
						<img src={data?.digital_sig_url} className="w-[50px]" />
					</td>
					<td className="px-6 py-4">
						{new Date(data?.time_in).toLocaleString("en-US", {
							hour: "numeric",
							minute: "2-digit",
							month: "long",
							day: "2-digit",
							year: "numeric",
							timeZone: "Asia/Manila", // Set the time zone to Philippine time
						})}
					</td>
					<td className="px-6 py-4">
						{data?.time_out &&
							new Date(data?.time_out).toLocaleString("en-US", {
								hour: "numeric",
								minute: "2-digit",
								month: "long",
								day: "2-digit",
								year: "numeric",
								timeZone: "Asia/Manila", // Set the time zone to Philippine time
							})}
					</td>
					<td className="px-6 py-4">{formatHours(data?.total_hours)} hrs</td>
					<td className="px-6 py-4">
						{data?.admin_first_name} {data?.admin_last_name}
					</td>
				</tr>
			))}
		</tbody>
	);
};

export default StudentStats;
