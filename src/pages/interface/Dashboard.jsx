import Topbar from "../../components/Topbar";
// import Overviewbar from "../../components/Overviewbar";
import Statistics from "../../components/Statistics";
import StudentLists from "../../components/StudentLists";
import { useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

const Dashboard = () => { 

    const college_id = localStorage.getItem("college_id");
    const [programInfo, setProgramInfo] = useState([]);
    const [selectedProgram, setSelectedProgram] = useState(false);

    const handleCollegeRequest = async () => {
            try {
                let response = await fetch(`https://do-track-backend-production.up.railway.app/api/college/get-programs-college/${college_id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                });
                
                if (response.ok) {
                    const data = await response.json();
                    setProgramInfo(data?.data);
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
    
  useEffect(() => {
    setProgramData(programInfo.programs);
  }, [programInfo.programs]);

  
  const handleProgramClick = (programId) => {
    handleAttendProgramRequest(programId);
    setProgram(false);
    setSelectedProgram(true);
  };

  const toggleProgram = () => {
    if (program) {
        setProgram(false);
    } else {
        setProgram(true);
    }
  };


  const handleAttendProgramRequest = async (programId) => {
    try {
      let response = await fetch(
        `https://do-track-backend-production.up.railway.app/api/attendance/getStudentAttendees/${programId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setProgramAttend(data?.data);
      }
    } catch (err) {
      console.log("Unable to fetch attendance by program");
    }
  };

    return (
        <div className="flex flex-col mt-20 py-6 px-16">
            <div className="fixed top-0 left-0 w-full bg-white shadow-md z-40 px-16 pt-6">
                <Topbar />
            </div>
            <div className="flex items-center justify-between pb-5">
                <div className="flex items-center gap-2">
                    <h1 className="font-bold text-2xl text-primPurple">Overview</h1>
                    <div className="flex items-center">
                    <img
                        src="static/icons/CCIS-logo.png"
                        alt="CCIS-logo"
                        className="w-[42px]"
                    />
                    {programInfo?.college?.map((data, key) => (
                        <p key={key} className="text-sm text-gray-500">
                        {data?.college_name}
                        </p>
                    ))}
                    </div>
                </div>
                <button
                    onClick={toggleProgram}
                    className="flex items-center gap-2 border p-1 px-5 rounded-full bg-gray-300 text-gray-700 font-medium text-sm"
                >
                    Select Program <RiArrowDropDownLine size={28} />
                </button>
                {program && (
                    <div className="z-30 absolute right-16 top-[134px] mt-2 bg-gray-200 rounded-lg shadow w-auto">
                    <ul className="py-2 text-sm text-gray-700">
                        {programData?.map((data, key) => (
                        <li key={key}>
                            <button
                                onClick={() => handleProgramClick(data?.program_id)}
                                className="flex px-4 py-2 hover:bg-gray-100 w-full"
                            >
                                {data?.program_name}
                            </button>
                        </li>
                        ))}
                    </ul>
                    </div>
                )}
                {/* <StudentStats programAttend={programAttend} /> */}
            </div>
            <hr />
            <Statistics />
            <StudentLists programAttend={programAttend} selectedProgram={selectedProgram} />
        </div>
    );
};

export default Dashboard;