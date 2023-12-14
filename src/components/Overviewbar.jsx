import { RiArrowDropDownLine } from "react-icons/ri";
import { useState } from "react";

const Overviewbar = () => {

    const [college, setCollege] = useState(false);

    const toggleCollege = () => {
        setCollege(!college);
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
                onClick={toggleCollege}
                className="flex items-center gap-2 border p-1 px-5 rounded-full bg-gray-300 text-gray-700 font-medium text-sm">
                    Select College <RiArrowDropDownLine size={28} />
            </button>
            {college && (
                <div className="z-50 absolute right-16 top-[134px] mt-2 bg-gray-200 rounded-lg shadow w-auto">
                    <ul className="py-2 text-sm text-gray-700">
                        <li>
                            <a href="#" className="flex px-4 py-2 hover:bg-gray-100 ">
                                CCIS
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 ">
                                CEGS
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 ">
                                CED
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 ">
                                CAA
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 ">
                                CMNS
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 ">
                                CHASS
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 ">
                                COFES
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Overviewbar;