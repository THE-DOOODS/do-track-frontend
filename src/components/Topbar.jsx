import React, { useRef, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoMdExit } from "react-icons/io";
import { useNavigate } from "react-router";
import Logout from "./modals/Logout";
import LoadingBar from "react-top-loading-bar";
import { Toaster, toast } from "sonner";

const Topbar = () => {
	const [isLogout, setIsLogout] = useState(false);

	const navigator = useNavigate();
	const loadingBar = useRef(null);
	const promise = () => new Promise((resolve) => setTimeout(resolve, 1000));

	const first_name = localStorage.getItem("first_name");
	const last_name = localStorage.getItem("last_name");

	const token = localStorage.getItem("token");

	const handleLogout = async () => {
		setIsLogout(true);
	};

	const handleCloseLogout = () => {
		setIsLogout(false);
	};

	const handleConfirmLogout = async () => {
		loadingBar.current.continuousStart(60);
		let response = await fetch(
			"https://do-track-backend-production.up.railway.app/api/logout",
			{
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		if (response.ok) {
			toast.promise(promise, {
				loading: "Logging out...",
				success: () => {
					return `${first_name} has been logged out`;
				},
				error: "Error",
			});
			setTimeout(() => {
				loadingBar.current.complete();
				setTimeout(() => {
					navigator("/login");
					localStorage.clear();
					setIsLogout(false);
				}, 1200);
			}, 1000);
		}
	};

	return (
		<div className="flex w-full items-center justify-between pb-3 lg:max-w-7xl md:mx-auto">
			<LoadingBar height={7} color="#4ab516" ref={loadingBar} />
			{isLogout && (
				<Logout onClose={handleCloseLogout} onConfirm={handleConfirmLogout} />
			)}
			<img
				src="/static/icons/Logo.png"
				alt="Do-Track Logo"
				className="w-[80px] md:w-[116px]"
			/>
			<div className="flex w-full items-center justify-end gap-3 ">
				<h1 className="text-xs">
					{first_name} {last_name}
				</h1>
				<div className="flex items-center gap-2 relative">
					<img src="/static/icons/avatar.jpg" alt="" className="w-[42px] rounded-full" />
					{/* <div className="w-[32px] h-[32px] rounded-full bg-primPurple"></div> */}
					<button onClick={handleLogout} className="rounded-md text-primOrange">
						<IoMdExit size={22} className="hover:text-purple-200 transition duration-500" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Topbar;
