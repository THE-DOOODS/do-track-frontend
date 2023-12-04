import { RiArrowDropDownLine } from "react-icons/ri";

const Topbar = () => {
    return (
        <div className="flex items-center justify-between pb-3">
            <img src="/static/icons/Logo.png" alt="Do-Track Logo" className="w-[116px]" />
            <div className="flex items-center gap-3">
                <h1 className="">Overview</h1>
                <div className="flex items-center gap-2">
                    <div className="w-[32px] h-[32px] rounded-full bg-primPurple"></div>
                    <button className="rounded-md bg-gray-200 p-1"><RiArrowDropDownLine /></button>
                </div>
            </div>
        </div>
    );
};

export default Topbar;