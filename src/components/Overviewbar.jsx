import { RiArrowDropDownLine } from "react-icons/ri";

const Overviewbar = () => {
    return (
        <div className="flex items-center justify-between pb-5 ">
            <div className="flex items-center gap-2">
                <h1 className="font-bold text-2xl text-primPurple">Overview</h1>
                <div className="flex items-center">
                    <img src="static/icons/CCIS-logo.png" alt="CCIS-logo" className="w-[42px]" />
                    <p className="text-sm text-gray-500">College of Computing and Information Sciences</p>
                </div>
            </div>
            <button className="flex items-center gap-2 border p-1 px-5 rounded-full bg-gray-300 text-gray-700 font-medium text-sm">Select College <RiArrowDropDownLine size={28} /></button>
        </div>
    );
};

export default Overviewbar;