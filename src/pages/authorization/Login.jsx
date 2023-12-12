import React, { useState } from 'react';
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex w-full h-screen justify-between">
            <div className="flex justify-end items-end bg-gradient-to-b from-primPurple to-primOrange h-sreen w-full">
                <img src="./public/static/images/login_illustrator.png" alt="" className="w-[700px]" />
            </div>
            <div className="flex flex-col justify-center w-full p-10">
                <div className="flex items-end mt-10 mx-20">
                    <img src="/static/icons/Logo.png" alt="" className="w-[136px]" />
                    {/* <h1 className="font-extrabold text-2xl text-primPurple">o<span className="text-logoOrange">-TRACK</span></h1> */}
                </div>
                <div className="flex flex-col mx-20 gap-3 pt-6">
                    <h1 className="font-bold text-primPurple text-xl">Log in</h1>
                    <p className="text-gray-600">Start managing attendees in the Do-Day event</p>
                </div>
                <div className="flex flex-col mx-20 pt-4 gap-5">
                    <div className="flex flex-col gap-1">
                        <label className="text-gray-500 font-medium">Email</label>
                        <input 
                            type="text"
                            placeholder='sample@carsu.edu.ph'
                            className="border border-gray-300 rounded-md border-l-primPurple text-gray-600 border-l-[12px] outline-none h-10 p-2"
                        />
                    </div>
                    <div className="flex flex-col gap-1 relative">
                        <label className="text-gray-500 font-medium">Password</label>
                        <input 
                            type={showPassword ? "text" : "password"}
                            className="border border-gray-300 rounded-md border-l-primPurple text-gray-600 border-l-[12px] outline-none h-10 p-2"
                        />
                        <div
                            class="absolute inset-y-10 right-0 pr-3 items-center text-primPurple cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <PiEyeBold /> : <PiEyeClosedBold />}
                        </div>
                    </div>
                </div>
                <div className="flex pt-4 gap-1 items-center mx-20 pb-2">
                    <input type="checkbox" />
                    <span className="text-gray-400">Remember me</span>
                </div>
                <button className="bg-gradient-to-r from-primPurple to-primOrange text-white h-10 p-2 rounded-md mx-20">
                    Sign In
                </button>
                <p className="text-gray-500 mx-20 pt-2">Don't have an account yet? <a href="/signup"><u className="text-primPurple">Sign up</u></a></p>
            </div>
        </div>
    );
};

export default Login;