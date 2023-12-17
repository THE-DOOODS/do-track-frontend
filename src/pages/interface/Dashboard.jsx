import Topbar from "../../components/Topbar";
import Overviewbar from "../../components/Overviewbar";
import Statistics from "../../components/Statistics";
import StudentLists from "../../components/StudentLists";
import { useEffect, useState } from "react";

const Dashboard = () => { 

    const college_id = localStorage.getItem("college_id");
    const [programInfo, setProgramInfo] = useState([]);

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
                    console.log(data);
                    setProgramInfo(data?.data);
                }
    
            } catch (err) {
                console.log("Unable to fetch college!");
            }
    };
     
    useEffect(() => {
        handleCollegeRequest();
    },[]);

    return (
        <div className="flex flex-col mt-20 py-6 px-16">
            <div className="fixed top-0 left-0 w-full bg-white shadow-md z-40 px-16 pt-6">
                <Topbar />
            </div>
            <Overviewbar programInfo={programInfo} />
            <hr />
            <Statistics />
            <StudentLists />
        </div>
    );
};

export default Dashboard;