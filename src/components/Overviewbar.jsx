import { RiArrowDropDownLine } from "react-icons/ri";
import { useState } from "react";

const Overviewbar = () => {

    const college_id = localStorage.getItem("college_id");

    const [program, setprogram] = useState(false);

    const toggleprogram = () => {
        setprogram(!program);
    };

    const handleCollegeRequest = async () => {
        try {
            let collResponse = await fetch(`http://do-track-backend-production.up.railway.app/api/ /${college_id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            
            if (collResponse.ok) {
                const data = await collResponse.json();
                console.log(data);
            }

        } catch (err) {
            console.log("Unable to fetch college!");
        }
    };

    const handleProgramRequest = async () => {
        try {
            let progResponse = await fetch(`http://do-track-backend-production.up.railway.app/api/ /${college_id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (progResponse.ok) {
                const data = await progResponse.json();
                console.log(data);
            }

        } catch (err) {
            console.log("Unable to fetch program!");
        }
    };

    return (
        <div className="flex items-center justify-between pb-5">
            <div className="flex items-center gap-2">
                <h1 className="font-bold text-2xl text-primPurple">Overview</h1>
                <div className="flex items-center">
                    <img src="static/icons/CCIS-logo.png" alt="CCIS-logo" className="w-[42px]" />
                    <p className="text-sm text-gray-500">College of Computing and Information Sciences</p>
                </div>
            </div>
            <button
                onClick={toggleprogram}
                className="flex items-center gap-2 border p-1 px-5 rounded-full bg-gray-300 text-gray-700 font-medium text-sm">
                    Select Program <RiArrowDropDownLine size={28} />
            </button>
            {program && (
                <div className="z-40 absolute right-16 top-[134px] mt-2 bg-gray-200 rounded-lg shadow w-auto">
                    <ul className="py-2 text-sm text-gray-700">
                        <li>
                            <a href="#" className="flex px-4 py-2 hover:bg-gray-100 ">
                                Information Technology
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 ">
                                Information System
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 ">
                                Computer Science
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Overviewbar;