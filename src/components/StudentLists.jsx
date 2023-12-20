import { TbClipboardList } from "react-icons/tb";
import { TablePagination } from "@mui/material";
import StudentStats from "./StudentStats";
import { useState, useEffect, useRef } from "react";

import JsPDF, { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

import { IoIosSearch } from "react-icons/io";

const StudentLists = ({ programAttend, selectedProgram, allStudents }) => {
	const college_id = localStorage.getItem("college_id");

	const [collegeAttend, setCollegeAttend] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const [searchID, setSearchID] = useState("");

	const list = useRef(null);

	const handleAttendCollegeRequest = async () => {
		try {
			let response = await fetch(
				`https://do-track-backend-production.up.railway.app/api/attendance/attendance-by-college/${college_id}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
					},
				},
			);

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
	}, []);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const paginatedData = collegeAttend.slice(
		page * rowsPerPage,
		page * rowsPerPage + rowsPerPage,
	);

	// function for handling the creation of pdf list of all atudent attendees
	const exportPDF = () => {
		// Adjust the width and height based on your requirements
		const pdfWidth = 210;
		const pdfHeight = 297;
		const margin = 0.5 * 18; // 0.5 inch converted to points (1 inch = 72 points)

		// Create a new PDF document with specified dimensions
		const listPdf = new jsPDF("portrait", "pt", [pdfWidth, pdfHeight]);

		// Get the HTML element containing the list of students
		const listElement = list.current;

		// Use html2canvas to capture the HTML element as an image
		html2canvas(listElement).then((canvas) => {
			// Calculate the scaling factor based on the PDF dimensions
			const imgData = canvas.toDataURL("image/jpeg", 1.0);
			const scaleFactor = (pdfWidth - 2 * margin) / canvas.width; // Adjusted for the margins

			// Add the image to the PDF with the calculated scaling and margin
			listPdf.addImage(
				imgData,
				"JPEG",
				margin,
				margin,
				pdfWidth - 2 * margin,
				canvas.height * scaleFactor,
			);

			// Save the PDF with a specific filename
			listPdf.save(`student_list.pdf`);
		});
	};

	// search functionalities
	const handleSearchStudentAttendee = (event) => {
		if (event.key === "Enter") {
			// todo implement the search functionality here
			//? overwrite the data that is being passed from params
		}
	};

	return (
		<div className="flex flex-col py-4 gap-3">
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-bold text-gray-600">List of Attendees</h1>
				<div className="flex items-center gap-2">
					<div className="relative flex items-center">
						<input
							type="text"
							placeholder="Search student by ID no."
							className="h-10 px-12 rounded-full outline-primPurple text-xs border border-gray-300 text-gray-500"
							value={searchID}
							onChange={(e) => setSearchID(e.target.value)}
							onKeyDown={handleSearchStudentAttendee}
						/>
						<IoIosSearch
							onClick={handleSearchStudentAttendee}
							className="absolute left-3 text-gray-500"
						/>
					</div>
					<button
						onClick={exportPDF}
						className="flex items-center gap-2 border p-1 px-4 rounded-full text-sm text-white bg-primOrange h-10">
						Convert List of PDF <TbClipboardList size={16} />
					</button>
				</div>
			</div>
			<div ref={list} className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
					<StudentStats
						paginatedData={paginatedData}
						collegeAttend={collegeAttend}
						programAttend={programAttend}
						selectedProgram={selectedProgram}
						allStudents={allStudents}
					/>
				</table>
			</div>
			<TablePagination
				rowsPerPageOptions={[10, 25, 50, { label: "All", value: -1 }]}
				component="div"
				count={collegeAttend.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</div>
	);
};

export default StudentLists;
