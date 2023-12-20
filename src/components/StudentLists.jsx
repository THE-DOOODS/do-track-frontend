import { TbClipboardList } from "react-icons/tb";
import { TablePagination } from "@mui/material";
import StudentStats from "./StudentStats";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

import JsPDF, { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

import { IoIosSearch } from "react-icons/io";
import { StudentSearchModal } from "./modals/StudentSearchModal";

const StudentLists = ({ programAttend, selectedProgram, allStudents }) => {
	const promise = () => new Promise((resolve) => setTimeout(resolve, 1000));
	const college_id = localStorage.getItem("college_id");
	const [collegeAttend, setCollegeAttend] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [openSearchModal, setOpenSearchModal] = useState(false);
	const [searchStudentData, setSearchStudentData] = useState([]);
	const [searchID, setSearchID] = useState("");

	const [displayedData, setDisplayedData] = useState([]);

	const list = useRef(null);

	const token = localStorage.getItem("token");

	const handleAttendCollegeRequest = async () => {
		try {
			let response = await fetch(
				`https://do-track-backend-production.up.railway.app/api/attendance/attendance-by-college/${college_id}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
						Authorization: `Bearer ${token}`,
					},
				},
			);

			if (response.ok) {
				const data = await response.json();
				setCollegeAttend(data?.data);
			}
		} catch (err) {
			console.log("Unable to fetch attendance by college", err);
		}
	};

	useEffect(() => {
		handleAttendCollegeRequest();
	}, []);

	useEffect(() => {
		const startIndex = page * rowsPerPage;
		const endIndex = startIndex + rowsPerPage;
		setDisplayedData(collegeAttend.slice(startIndex, endIndex));
	}, [collegeAttend, page, rowsPerPage]);

	const handleChangePage = (event, newPage) => {
		const newStartIndex = newPage * rowsPerPage;
		const newEndIndex = newStartIndex + rowsPerPage;
		setDisplayedData(collegeAttend.slice(newStartIndex, newEndIndex));
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		const newRowsPerPage = parseInt(event.target.value, 10);
		setRowsPerPage(newRowsPerPage);

		// Calculate the new page based on the rowsPerPage change
		const newPage = Math.floor((page * rowsPerPage) / newRowsPerPage);
		setPage(newPage);

		const newStartIndex = newPage * newRowsPerPage;
		const newEndIndex = newStartIndex + newRowsPerPage;
		setDisplayedData(collegeAttend.slice(newStartIndex, newEndIndex));
	};

	const paginatedData = collegeAttend.slice(
		page * rowsPerPage,
		page * rowsPerPage + rowsPerPage,
	);

	// function for handling the creation of pdf list of all student attendees
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
	const handleSearchStudentAttendee = async (event) => {
		try {
			toast.promise(
				new Promise(async (resolve, reject) => {
					try {
						let response = await fetch(
							`https://do-track-backend-production.up.railway.app/api/attendance/find-student/${searchID}`,
							{
								method: "GET",
								headers: {
									"Content-Type": "application/json",
									Accept: "application/json",
									Authorization: `Bearer ${token}`,
								},
							},
						);

						if (response.ok) {
							const data = await response.json();
							setDisplayedData(data?.data.slice(0, rowsPerPage));
							setTimeout(() => {
								setOpenSearchModal(true);
								setSearchStudentData(data);
								resolve(data); // Resolve the promise on success
							}, 1000);
						} else {
							// If the response is not ok, reject the promise
							reject("Student record does not exist");
						}
					} catch (err) {
						// If there's an error, reject the promise
						reject("An error occurred while searching for the student");
					}
				}),
				{
					loading: "Searching student...",
					success: (data) => `Student information found`,
					error: (message) => message,
				},
			);
		} catch (err) {
			console.error("An error occurred:", err);
		}
	};

	const onChangeCloseModal = (value) => {
		if (value) {
			setOpenSearchModal(false);
		}
	};

	return (
		<div className="flex flex-col py-4 gap-3">
			{openSearchModal && (
				<StudentSearchModal
					searchStudentData={searchStudentData}
					onChangeCloseModal={(value) => onChangeCloseModal(value)}
				/>
			)}
			<div className="flex items-center justify-between">
				<h1 className="text-sm md:text-xl font-bold text-gray-600">
					List of Attendees
				</h1>
				<div className="flex items-center justify-end gap-2">
					<div className="relative flex items-center">
						<input
							type="text"
							placeholder="Search student ID"
							className="h-10 px-4 md:px-12 rounded-full outline-primPurple text-xs border border-gray-300 text-gray-500"
							value={searchID}
							onChange={(e) => setSearchID(e.target.value)}
							onKeyDown={(event) => {
								if (event.key === "Enter") {
									handleSearchStudentAttendee();
								}
							}}
						/>
						<IoIosSearch
							onClick={handleSearchStudentAttendee}
							className="absolute z-10 text-[22px] font-bold transition duration-500 hover:text-primOrange right-3 text-gray-500 cursor-pointer"
						/>
					</div>
					<button
						onClick={exportPDF}
						className="hidden md:flex items-center gap-2 border p-1 px-4 rounded-full text-sm text-white bg-primOrange transition duration-500 hover:bg-purple-200 h-10">
						Convert List of PDF <TbClipboardList size={16} />
					</button>
				</div>
			</div>
			<div ref={list} className="relative overflow-x-auto shadow-md sm:rounded-lg">
				<table className="w-full text-sm text-left rtl:text-right text-gray-500">
					<thead className="text-xs text-gray-700 uppercase bg-purple-200">
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
						paginatedData={displayedData}
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
