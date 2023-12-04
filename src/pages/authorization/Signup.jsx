import React, { useState } from 'react';
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import { Tooltip } from "react-tooltip";

const Signup = () => {
    const [inputFname, setInputFname] = useState('');
    const [inputLname, setInputLname] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputPass, setInputPass] = useState('');
    const [inputCPass, setInputCPass] = useState('');
    const [inputPosition, setInputPosition] = useState('');
    const [showCPassword, setShowCPassword] = useState(false);

    const [type, setType] = useState("password");
  
    const handleInputFnameChange = (e) => {
        setInputFname(e.target.value);
    };

    const handleInputLnameChange = (e) => {
        setInputLname(e.target.value);
    };

    const handleInputEmailChange = (e) => {
        setInputEmail(e.target.value);
    };

    const handleInputPassChange = (e) => {
        setInputPass(e.target.value);
    };
   
    const handleInputCPassChange = (e) => {
        setInputCPass(e.target.value);
    };

    const handleInputPositionChange = (e) => {
        setInputPosition(e.target.value);
    };

    return (
        <div className="flex flex-col justify-center items-center bg-gradient-to-b from-primPurple to-primOrange h-screen w-full">
            <div className="flex flex-col gap-5 border rounded-lg bg-white p-12 shadow-xl">
                <div className="flex flex-col items-center">
                    <img src="/static/icons/Logo.png" alt="Do-Track Logo" className="w-[136px] pb-10" />
                    <h1 className="text-primPurple text-4xl font-semibold">Create account.</h1>
                </div>
                <div className="flex flex-col items-start gap-2">
                    <p className="text-gray-400 font-medium">Already registered? <a href="/login" className="text-primPurple"><u>Sign In</u></a></p>
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-2">
                            <div className="flex flex-col gap-1 relative">
                                <label
                                    className={`absolute items-center left-2 transition-all ease-out ${
                                    inputFname ? 'top-0 text-[10px] text-primPurple' : 'top-3 text-xs text-gray-400'
                                    }`}
                                    style={{ pointerEvents: 'none' }}
                                >
                                    First name
                                </label>
                                <input
                                    type="text"
                                    value={inputFname}
                                    onChange={handleInputFnameChange}
                                    className="border border-primPurple rounded-md outline-none text-sm text-gray-600 h-10 p-2"
                                />
                            </div>
                            <div className="flex flex-col gap-1 relative">
                                <label
                                    className={`absolute left-2 transition-all ease-out ${
                                    inputLname ? 'top-0 text-[10px] text-primPurple' : 'top-3 text-xs text-gray-400'
                                    }`}
                                    style={{ pointerEvents: 'none' }}
                                >
                                    Last name
                                </label>
                                <input
                                    type="text"
                                    value={inputLname}
                                    onChange={handleInputLnameChange}
                                    className="border border-primPurple rounded-md outline-none text-sm text-gray-600 h-10 p-2"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 relative">
                            <label
                                className={`absolute left-2 transition-all ease-out ${
                                inputEmail ? 'top-0 text-[10px] text-primPurple' : 'top-3 text-xs text-gray-400'
                                }`}
                                style={{ pointerEvents: 'none' }}
                            >
                                Email
                            </label>
                            <input
                                type="text"
                                value={inputEmail}
                                onChange={handleInputEmailChange}
                                data-tooltip-id="emailTooltip"
                                className="border border-primPurple rounded-md outline-none text-sm text-gray-600 h-10 p-2"
                            />
                           <Tooltip
                                id="emailTooltip"
                                place="right"
                                className="z-20"
                                border="1px solid #5A5DFA"
                                style={{ background: "linear-gradient(to bottom, #AD31C1, #E7A557)" }}
                                >
                                <div className="text-xs text-white">
                                    <h1>Please use your university email</h1>
                                </div>
                            </Tooltip>
                        </div>
                        <div className="flex flex-col gap-1 relative">
                            <label
                                className={`absolute left-2 transition-all ease-out ${
                                inputPass ? 'top-0 text-[10px] text-primPurple' : 'top-3 text-xs text-gray-400'
                                }`}
                                style={{ pointerEvents: 'none' }}
                            >
                                Password
                            </label>
                            <input
                                type={type}
                                value={inputPass}
                                onChange={handleInputPassChange}
                                className="border border-primPurple rounded-md outline-none text-sm text-gray-600 h-10 p-2"
                            />
                            {type === "password" ? (
                                <span
                                    className="icon-span absolute inset-y-0 right-0 pr-3 flex items-center text-primPurple cursor-pointer"
                                    onClick={() => setType("text")}>
                                    <PiEyeClosedBold />
                                </span>
                            ) : (
                                <span
                                    className="icon-span absolute inset-y-0 right-0 pr-3 flex items-center text-primPurple cursor-pointer"
                                    onClick={() => setType("password")}>
                                    <PiEyeBold />
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col gap-1 relative">
                            <label
                                className={`absolute left-2 transition-all ease-out ${
                                inputCPass ? 'top-0 text-[10px] text-primPurple' : 'top-3 text-xs text-gray-400'
                                }`}
                                style={{ pointerEvents: 'none' }}
                            >
                                Confirm Password
                            </label>
                            <input
                                type={showCPassword ? "text" : "password"}
                                value={inputCPass}
                                onChange={handleInputCPassChange}
                                className="border border-primPurple rounded-md outline-none text-sm text-gray-600 h-10 p-2"
                            />
                            <div
                                class="absolute inset-y-0 right-0 pr-3 flex items-center text-primPurple cursor-pointer"
                                onClick={() => setShowCPassword(!showCPassword)}>
                                {showCPassword ? <PiEyeBold /> : <PiEyeClosedBold />}
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 relative">
                            <label
                                className={`absolute left-2 transition-all ease-out ${
                                inputPosition ? 'top-0 text-[10px] text-primPurple' : 'top-3 text-xs text-gray-400'
                                }`}
                                style={{ pointerEvents: 'none' }}
                            >
                                Position
                            </label>
                            <input
                                type="text"
                                value={inputPosition}
                                onChange={handleInputPositionChange}
                                className="border border-primPurple rounded-md outline-none text-sm text-gray-600 h-10 p-2"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <button className="bg-primPurple text-white font-semibold p-2 rounded-full w-[182px]">Sign Up</button>
                </div>
            </div>
        </div>
    );
};

export default Signup;