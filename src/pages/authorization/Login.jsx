import React, { useRef, useState, useEffect } from "react";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router";
import { Toaster, toast } from 'sonner';
import LoadingBar from 'react-top-loading-bar';
import Cookies from "js-cookie";

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rememberMe, setRememberMe] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [passError, setPassError] = useState(false);

	const emailRegex = /^[a-zA-Z0-9._-]+@carsu\.edu\.ph$/;

	const navigator = useNavigate();
	const loadingBar = useRef(null);
	const promise = () => new Promise((resolve) => setTimeout(resolve, 1000));

	const rememberMeCookie = "remembered_credentials";

	useEffect(() => {
		// Load saved email from cookies when component mounts
		const savedEmail = Cookies.get(rememberMeCookie);
	  
		if (savedEmail) {
		  setEmail(savedEmail);
		  setRememberMe(true);
		}
	  }, []);

	const handleLoginRequest = async (event) => {
		event.preventDefault();
		loadingBar.current.continuousStart(60);
		
		setEmailError(false);
		setPassError(false);
		
		const fields = [
			{value: password, setError: setPassError, message: "Password is required"},
			{value: email, setError: setEmailError, message: "Email is required"},
		];

		let isValid = true;

		fields.forEach((field) => {
			if (field.value === "") {
				loadingBar.current.complete();
				field.setError(true);
				toast.error(field.message);
				isValid = false;
			}
		});
		
		if (isValid) {
			if (rememberMe) {
				// Save email to cookies
				Cookies.set(rememberMeCookie, email, { expires: 7 });
			} else {
				// Clear saved email from cookies
				Cookies.remove(rememberMeCookie);
			}

			if (email !== "" && !emailRegex.test(email)) {
				loadingBar.current.complete();
				toast.error('Please use university email')
				setEmailError(true);
			} else {
				try {
					let response = await fetch("https://do-track-backend-production.up.railway.app/api/login", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							email,
							password,
						}),
					});
					
					if (response.ok) {
						const data = await response.json();
						localStorage.setItem("admin_id", data.data?.admin?.admin_id);
						localStorage.setItem("college_id", data.data?.admin?.college_id);
						localStorage.setItem("email", data.data?.admin?.email);
						localStorage.setItem("first_name", data.data?.admin?.first_name);
						localStorage.setItem("last_name", data.data?.admin?.last_name);
						localStorage.setItem("position", data.data?.admin?.position);
						
						toast.promise(promise, {
							loading: 'Logging in...',
							success: () => {
							  return `Success Logging In`;
							},
							error: 'Error',
						});
						setTimeout(() => {
							loadingBar.current.complete();
							setTimeout(() => {
								navigator("/dashboard");
							}, 1200)
						},1000);
					} else {
						if (response.status === 401) {
							const data = await response.json();
							if (data.message === "Admin not found") {
								loadingBar.current.complete();
								setEmailError(true);
								toast.error('User does not exist');
							}
						} else if (response.status === 403) {
							const data = await response.json();
							if (data.message === "Invalid password. Please try again.") {
								loadingBar.current.complete();
								setPassError(true);
								toast.error('Incorrect password');
							}
						}
					}
				} catch (err) {
					loadingBar.current.complete();
					toast.warning('Internal Server Error')
					console.log(err);
				}
			}
		}
	};

	return (
		<div className="flex w-full h-screen items-center lg:items-end justify-center lg:justify-between bg-gradient-to-b from-primPurple to-primOrange md:bg-white">
			<LoadingBar height={7} color="#4ab516" ref={loadingBar} />
			<Toaster closeButton position="top-center" richColors />
			<div className="lg:w-full hidden lg:flex justify-end items-end">
				<img src="/static/images/login_illustrator.png" alt="" className="w-[700px]" />
			</div>
			<div className="flex flex-col justify-between lg:justify-center w-[332px] lg:w-full h-[524px] lg:h-full rounded-lg lg:rounded-none p-5 lg:p-10 bg-white">
				<div className="flex flex-row justify-between items-start mx-0 lg:mx-20">
					<div>
						<img src="/static/icons/Logo.png" alt="" className="w-[136px]" />
					</div>
					<div className="flex items-center">
						<a href="/">
						<IoClose className="text-primPurple" size={32} />
						</a>
					</div>
				</div>
				<div className="flex flex-col mx-0 lg:mx-20 gap-3 pt-6">
					<h1 className="font-bold text-primPurple text-xl">Log in</h1>
					<p className="text-gray-600">
						Start managing attendees in the Do-Day event
					</p>
				</div>
				<form>
					<div className="flex flex-col mx-0 lg:mx-20 pt-4 gap-5">
						<div className="flex flex-col gap-1">
							<label className={`${
								emailError
									? "text-red-500 font-medium"
									: "text-gray-500 font-medium"
							}`}>
								Email
							</label>
							<input
								type="text"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="sample@carsu.edu.ph"
								className={`${
									emailError
										? "border border-red-500 rounded-md border-l-red-500 text-gray-600 border-l-[12px] outline-none h-10 p-2"
										: "border border-gray-300 rounded-md border-l-primPurple text-gray-600 border-l-[12px] outline-none h-10 p-2"
								}`}
							/>
						</div>
						<div className="flex flex-col gap-1 relative">
							<label className={`${
								passError
									? "text-red-500 font-medium"
									: "text-gray-500 font-medium"
							}`}>
								Password
							</label>
							<input
								type={showPassword ? "text" : "password"}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className={`${
									passError
										? "border border-red-500 rounded-md border-l-red-500 text-gray-600 border-l-[12px] outline-none h-10 p-2"
										: "border border-gray-300 rounded-md border-l-primPurple text-gray-600 border-l-[12px] outline-none h-10 p-2"
								}`}
							/>
							<div
								className="absolute inset-y-10 right-0 pr-3 items-center text-primPurple cursor-pointer"
								onClick={() => setShowPassword(!showPassword)}>
								{showPassword ? <PiEyeBold /> : <PiEyeClosedBold />}
							</div>
						</div>
					</div>
				</form>
				<div className="flex pt-4 gap-1 items-center mx-0 lg:mx-20 pb-2">
				<input
					type="checkbox"
					checked={rememberMe}
					onChange={() => setRememberMe(!rememberMe)}
				/>
					<span className="text-gray-400 text-xs lg:text-base">Remember me</span>
				</div>
				<button
					onClick={handleLoginRequest}
					className="bg-gradient-to-r from-primPurple to-primOrange text-white h-10 p-2 rounded-md mx-0 lg:mx-20">
					Sign In
				</button>
				<p className="text-gray-500 mx-0 lg:mx-20 pt-2">
					Don't have an account yet?{" "}
					<a href="/signup">
						<u className="text-primPurple font-medium">Sign up</u>
					</a>
				</p>
			</div>
		</div>
	);
};

export default Login;
