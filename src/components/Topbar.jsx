import React, { useRef, useState } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { IoMdExit } from 'react-icons/io';
import { useNavigate } from "react-router";
import Logout from './modals/Logout';
import LoadingBar from 'react-top-loading-bar';
import { Toaster, toast } from 'sonner';

const Topbar = () => {
  const [menu, setMenu] = useState(false);
  const [isLogout, setIsLogout] = useState(false);

  const navigator = useNavigate();
  const loadingBar = useRef(null);
  const promise = () => new Promise((resolve) => setTimeout(resolve, 1000));

  const first_name = localStorage.getItem('first_name');
  const last_name = localStorage.getItem('last_name');

  const toggleMenu = () => {
    setMenu(!menu);
  };

  const handleLogout = () => {
    setIsLogout(true);
  };

  const handleCloseLogout = () => {
    setIsLogout(false);
  };

  const handleConfirmLogout = () => {
    loadingBar.current.continuousStart(60);
    toast.promise(promise, {
      loading: 'Logging out...',
      success: () => {
        return `${first_name} has been logged out`;
      },
      error: 'Error',
    });
    setTimeout(() => {
        loadingBar.current.complete();
        setTimeout(() => {
            navigator("/login");
            localStorage.clear();
            setIsLogout(false);
        }, 1200);
    }, 1000);
  };

  return (
    <div className="flex items-center justify-between pb-3">
      <LoadingBar height={7} color="#4ab516" ref={loadingBar} />
      {isLogout && <Logout onClose={handleCloseLogout} onConfirm={handleConfirmLogout} />}
      <img src="/static/icons/Logo.png" alt="Do-Track Logo" className="w-[116px]" />
      <div className="flex items-center gap-3">
        <h1>{first_name} {last_name}</h1>
        <div className="flex items-center gap-2 relative">
          <div className="w-[32px] h-[32px] rounded-full bg-primPurple"></div>
          <button onClick={toggleMenu} className="rounded-md bg-gray-200 p-1">
            <RiArrowDropDownLine />
          </button>
          {menu && (
            <div className="z-40 absolute top-full right-0 mt-2 bg-gray-200 rounded-lg shadow w-44">
              <ul className="py-2 text-sm text-gray-700">
                <li>
                  <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 w-full">
                    Sign Out <IoMdExit />
                  </button>
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
