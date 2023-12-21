import Topbar from "../../components/Topbar";
// import Overviewbar from "../../components/Overviewbar";
import Statistics from "../../components/Statistics";
import StudentLists from "../../components/StudentLists";
import { useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Toaster, toast } from "sonner";
import DeleteAllConfirmation from "../../components/modals/DeleteAllConfirmation";
import DeleteProgConfirmation from "../../components/modals/DeleteProgConfirmation";

const CollegeLogo = {
	"1" : "static/icons/CCIS-logo.png",
	"2" : "static/icons/CEGS-logo.png",
	"3" : "static/icons/CED-logo.png",
	"4" : "static/icons/CAA-logo.png",
	"5" : "static/icons/CMNS-logo.png",
	"6" : "static/icons/CHASS-logo.png",
	"7" : "static/icons/COFES-logo.png",
}

const Dashboard = () => {
	const college_id = localStorage.getItem("college_id");
	const [programInfo, setProgramInfo] = useState([]);
	const [selectedProgram, setSelectedProgram] = useState(false);
	const [openDeleteAllConfirmation, setOpenDeleteAllConfirmation] = useState(false);
	const [openDeleteProgConfirmation, setOpenDeleteProgConfirmation] = useState(false);

	const token = localStorage.getItem("token");

	const handleCollegeRequest = async () => {
		try {
			let response = await fetch(
				`https://do-track-backend-production.up.railway.app/api/college/get-programs-college/${college_id}`,
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
				setProgramInfo(data?.data);
			} else if (response.status === 404) {
				toast.error("No programs retrieved");
			}
		} catch (err) {
			console.log("Unable to fetch college!");
		}
	};

	useEffect(() => {
		handleCollegeRequest();
	}, []);

	const [program, setProgram] = useState(false);
	const [programData, setProgramData] = useState([]);
	const [programAttend, setProgramAttend] = useState([]);
	const [allStudents, setAllStudents] = useState(false);
	const [selectedProgramId, setSelectedProgramId] = useState(null);

	useEffect(() => {
		setProgramData(programInfo?.programs);
	}, [programInfo.programs]);

	const handleProgramClick = (programId) => {
		handleAttendProgramRequest(programId);
		setProgram(false);
		setSelectedProgram(true);
		setAllStudents(false);
		setSelectedProgramId(programId);
	};

	const handleAllStudentsClick = () => {
		handleCollegeRequest();
		setProgram(false);
		setAllStudents(true);
		setSelectedProgram(false);
		toast.info(`Displaying all students`);
	};

	const handleProgramChange = (event) => {
		const selectedProgramId = event.target.value;
		if (selectedProgramId === 'allStudents') {
		  handleAllStudentsClick();
		} else {
		  handleProgramClick(selectedProgramId);
		}
	  };

	const toggleProgram = () => {
		setProgram((prevProgram) => !prevProgram);
	};

	const handleAttendProgramRequest = async (programId) => {
		try {
			let response = await fetch(
				`https://do-track-backend-production.up.railway.app/api/attendance/attendance-by-program/${programId}`,
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
				toast.dismiss();
				toast.info(`Displaying students in ${data?.data[0]?.program_name}`);
				setProgramAttend(data?.data);
			} else if (response.status === 404) {
				toast.error(`No students attendance in this program`);
			}
		} catch (err) {
			console.log("Unable to fetch college!");
		}
	};

	const handleDeleteOptionChange = (event) => {
		const selectedOption = event.target.value;
		
		if (selectedOption === 'deleteAll') {
			setOpenDeleteAllConfirmation(true);
		} else if (selectedOption === 'deleteByProgram') {
			setOpenDeleteProgConfirmation(true);
		}
	};

	const onChangeCloseModal = (value) => {
		if (value) {
		  setOpenDeleteAllConfirmation(false);
		  setOpenDeleteProgConfirmation(false);
	  
		  const deleteOptionSelect = document.getElementById("deleteOptionSelect");
		  if (deleteOptionSelect) {
			deleteOptionSelect.value = "";
		  }
		}
	  };

	return (
		<div className="flex flex-col mt-10 md:mt-16 py-6 px-5 md:px-16 lg:max-w-7xl md:mx-auto">
			{openDeleteAllConfirmation && (
				<DeleteAllConfirmation onChangeCloseModal={(value) => onChangeCloseModal(value)} />
			)}
			{openDeleteProgConfirmation && (
				<DeleteProgConfirmation onChangeCloseModal={(value) => onChangeCloseModal(value)} selectedProgramId={selectedProgramId} />
			)}
			<Toaster position="top-center" closeButton richColors />
			<div className="fixed top-0 left-0 w-full pt-2 bg-white shadow-md z-40 px-5 md:px-16">
				<Topbar />
			</div>
			<div className="flex items-center justify-between pb-5">
				<div className="w-full md:flex items-center gap-2">
					<div className="flex w-full justify-between items-center gap-2 border border-gray-50 shadow backdrop-filter bg-gradient-to-r from-primPurple to-primOrange rounded-lg p-2">
						<div className="flex items-center gap-4">
							<img
								src={CollegeLogo[college_id]}
								alt="College-logo"
								className="w-[42px] md:w-[100px] rounded-md"
							/>
							{programInfo?.college?.map((data, key) => (
								<p
									key={key}
									className="text-xs md:text-2xl font-bold w-[450px] text-white">
									{data?.college_name}
								</p>
							))}
						</div>
						<select
							name=""
							id="deleteOptionSelect"  // Add an id to the select element
							className="bg-white rounded-full w-[150px] h-10 outline-none px-2 text-xs text-center"
							onChange={(e) => handleDeleteOptionChange(e)}
						>
							<option value="">Delete Options</option>
							<option value="deleteAll">Delete All Records</option>
							<option value="deleteByProgram">Delete By Program</option>
						</select>
					</div>
				</div>
				{/* <StudentStats programAttend={programAttend} /> */}
			</div>
			<div className="flex items-center justify-between mb-5">
				<h1 className="font-bold text-2xl text-primPurple">Overview</h1>
				<select
				onChange={handleProgramChange}
				className="flex items-center gap-0 text-white text-center outline-none border px-2 rounded-full h-10 bg-primPurple hover:bg-purple-400 transition duration-500 font-medium text-xs md:text-sm"
				>
				<option value="allStudents" className="bg-gray-200 text-gray-600 text-sm">All Students</option>
				{programData?.map((data, key) => (
					<option key={key} value={data?.program_id} className="bg-gray-200 text-gray-600 text-sm transition duration-500">
					{data?.program_name}
					</option>
				))}
				</select>
			</div>
			{/* {program && (
				<div className="z-30 absolute right-16 top-[118px] mt-2 bg-gray-200 rounded-lg shadow w-auto">
					<ul className="py-2 text-sm text-gray-700">
						<button
							onClick={handleAllStudentsClick}
							className="flex px-4 py-2 hover:bg-gray-100 w-full">
							All Students
						</button>
						{programData?.map((data, key) => (
							<li key={key}>
								<button
									onClick={() => handleProgramClick(data?.program_id)}
									className="flex px-4 py-2 hover:bg-gray-100 w-full">
									{data?.program_name}
								</button>
							</li>
						))}
					</ul>
				</div>
			)} */}
			<hr />
			<Statistics programInfo={programInfo} />
			<div>
				<StudentLists
					programAttend={programAttend}
					selectedProgram={selectedProgram}
					allStudents={allStudents}
				/>
			</div>
		</div>
	);
};

export default Dashboard;
