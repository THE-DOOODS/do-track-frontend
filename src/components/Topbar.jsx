import { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoMdExit } from "react-icons/io";

const Topbar = () => {
    const [menu, setMenu] = useState(false);

    const toggleMenu = () => {
        setMenu(!menu);
    };

    return (
        <div className="flex items-center justify-between pb-3">
            <img src="/static/icons/Logo.png" alt="Do-Track Logo" className="w-[116px]" />
            <div className="flex items-center gap-3">
                <h1 className="">Overview</h1>
                <div className="flex items-center gap-2 relative">
                    <div className="w-[32px] h-[32px] rounded-full bg-primPurple"></div>
                    <button
                        onClick={toggleMenu}
                        className="rounded-md bg-gray-200 p-1"
                    >
                        <RiArrowDropDownLine />
                    </button>
                    {menu && (
                        <div className="z-50 absolute top-full right-0 mt-2 bg-gray-200 rounded-lg shadow w-44">
                            <ul className="py-2 text-sm text-gray-700">
                                <li>
                                    <a href="#" className="flex px-4 py-2 hover:bg-gray-100 ">
                                        Settings
                                    </a>
                                </li>
                                <li>
                                    <a href="/login" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 ">
                                        Sign Out <IoMdExit />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Topbar;
