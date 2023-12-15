import React, { useState } from 'react';
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import { IoClose } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Tooltip } from "react-tooltip";
import CollegeOptions from '../../components/CollegeOptions';
import { useNavigate } from 'react-router';

const Signup = () => {
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [email, setEmail] = useState('');
    const [admin_id, setAdmin_id] = useState('');
    const [password, setPassword] = useState('');
    const [inputCPass, setInputCPass] = useState('');
    const [position, setPosition] = useState('');
    const [college, setCollege] = useState('');
    const [showCPassword, setShowCPassword] = useState(false);

    const colleges = ['--Choose College--', 'CCIS', 'CEGS', 'CED', 'CAA', 'CMNS', 'CHASS', 'COFES'];
    

    const [selectedCollege, setSelectedCollege] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    const [type, setType] = useState("password");

    const navigator = useNavigate();
  
    const handlefirst_nameChange = (e) => {
        setFirst_name(e.target.value);
    };

    const handlelast_nameChange = (e) => {
        setLast_name(e.target.value);
    };

    const handleemailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleInputadminIdChange = (e) => {
        setAdmin_id(e.target.value);
    };

    const handlepasswordChange = (e) => {
        setPassword(e.target.value);
    };
   
    const handleInputCPassChange = (e) => {
        setInputCPass(e.target.value);
    };

    const handlepositionChange = (e) => {
        setPosition(e.target.value);
    };

    const handlecollegeChange = (e) => {
        setCollege(e.target.value);
    };
    
    const handleSelectCollege = (college) => {
        if (college !== '--Choose College--') {
            setSelectedCollege(college);
            if (college === 'CCIS') {
                setCollege("1");
            } else if (college === 'CEGS') {
                setCollege("2");
            } else if (college === "CED") {
                setCollege("3");
            } else if (college === "CAA") {
                setCollege("4");
            } else if (college === "CMNS") {
                setCollege("5");
            } else if (college === "CHASS") {
                setCollege("6");
            } else if (college === "COFES") {
                setCollege("7");
            }
        } else {
          setSelectedCollege('');
        }
        setShowDropdown(false);
    };

    const handleSignupRequest = async (e) => {

        e.preventDefault();

        if (password !== inputCPass) {
            console.log("Password not matched!");
        } else {
            try {
                let response = await fetch("https://do-track-backend-production.up.railway.app/api/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        admin_id,
                        first_name,
                        last_name,
                        email,
                        password,
                        position,
                        college,
                    }),
                });
    
                if (response.ok) {
                    console.log("Success Registration");
                    setTimeout(() => {
                        navigator("/login");
                    }, 3000)
                }
                
            } catch (err) {
                console.log(err);
            }
        }

    }

    return (
        <div className="flex flex-col justify-center items-center bg-gradient-to-b from-primPurple to-primOrange h-screen w-full p-4">
            <div className="flex flex-col gap-5 border rounded-xl bg-white p-4 lg:p-6 px-6 lg:px-8 shadow-xl w-auto">
                <div className="flex flex-col items-center">
                    <img src="/static/icons/Logo.png" alt="Do-Track Logo" className="w-[166px] pb-2" />
                    <h1 className="text-primPurple text-xl md:text-3xl font-semibold">Create Account</h1>
                </div>
                <div className="flex flex-col items-start gap-1">
                    <div className="flex flex-col gap-3">
                        <div className="flex gap-2">
                            <div className="flex flex-col gap-1 relative">
                                <label
                                    className={`absolute items-center left-2 transition-all ease-out ${
                                    first_name ? 'top-0 text-[10px] text-primPurple' : 'top-3 text-xs text-gray-400'
                                    }`}
                                    style={{ pointerEvents: 'none' }}
                                >
                                    First name
                                </label>
                                <input
                                    id='fname'
                                    type="text"
                                    value={first_name}
                                    onChange={handlefirst_nameChange}
                                    className="border border-primPurple rounded-md outline-none text-sm text-gray-600 w-auto h-10 p-2"
                                />
                            </div>
                            <div className="flex flex-col gap-1 relative">
                                <label
                                    className={`absolute left-2 transition-all ease-out ${
                                    last_name ? 'top-0 text-[10px] text-primPurple' : 'top-3 text-xs text-gray-400'
                                    }`}
                                    style={{ pointerEvents: 'none' }}
                                >
                                    Last name
                                </label>
                                <input
                                    id='fname'
                                    type="text"
                                    value={last_name}
                                    onChange={handlelast_nameChange}
                                    className="border border-primPurple rounded-md outline-none text-sm text-gray-600 w-auto h-10 p-2"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 relative">
                            <label
                                className={`absolute left-2 transition-all ease-out ${
                                email ? 'top-0 text-[10px] text-primPurple' : 'top-3 text-xs text-gray-400'
                                }`}
                                style={{ pointerEvents: 'none' }}
                            >
                                Email
                            </label>
                            <input
                                id='fname'
                                type="text"
                                value={email}
                                onChange={handleemailChange}
                                data-tooltip-id="emailTooltip"
                                className="border border-primPurple rounded-md outline-none text-sm text-gray-600 w-auto h-10 p-2"
                            />
                           <Tooltip
                                id="emailTooltip"
                                place="right"
                                className="z-20"
                                border="1px solid #5A5DFA"
                                // style={{ background: "linear-gradient(to bottom, #AD31C1, #E7A557)" }}
                                style={{background:"white"}}
                                >
                                <div className="text-xs text-black">
                                    <h1>Please use your university email</h1>
                                </div>
                            </Tooltip>
                        </div>
                        <div className="flex flex-col gap-1 relative">
                            <label
                                className={`absolute left-2 transition-all ease-out ${
                                admin_id ? 'top-0 text-[10px] text-primPurple' : 'top-3 text-xs text-gray-400'
                                }`}
                                style={{ pointerEvents: 'none' }}
                            >
                                Student ID
                            </label>
                            <input
                                id='fname'
                                type="text"
                                value={admin_id}
                                onChange={handleInputadminIdChange}
                                className="border border-primPurple rounded-md outline-none text-sm text-gray-600 w-auto h-10 p-2"
                            />
                        </div>
                        <div className="flex flex-col gap-1 relative">
                            <label
                                className={`absolute left-2 transition-all ease-out ${
                                password ? 'top-0 text-[10px] text-primPurple' : 'top-3 text-xs text-gray-400'
                                }`}
                                style={{ pointerEvents: 'none' }}
                            >
                                Password
                            </label>
                            <input
                                id='fname'
                                type={type}
                                value={password}
                                onChange={handlepasswordChange}
                                className="border border-primPurple rounded-md outline-none text-sm text-gray-600 w-auto h-10 p-2"
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
                                id='fname'
                                type={showCPassword ? "text" : "password"}
                                value={inputCPass}
                                onChange={handleInputCPassChange}
                                className="border border-primPurple rounded-md outline-none text-sm text-gray-600 w-auto h-10 p-2"
                            />
                            <div
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-primPurple cursor-pointer"
                                onClick={() => setShowCPassword(!showCPassword)}>
                                {showCPassword ? <PiEyeBold /> : <PiEyeClosedBold />}
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 relative">
                            <label
                                className={`absolute left-2 transition-all ease-out ${
                                position ? 'top-0 text-[10px] text-primPurple' : 'top-3 text-xs text-gray-400'
                                }`}
                                style={{ pointerEvents: 'none' }}
                            >
                                Position
                            </label>
                            <input
                                id='fname'
                                type="text"
                                value={position}
                                onChange={handlepositionChange}
                                className="border border-primPurple rounded-md outline-none text-sm text-gray-600 w-auto h-10 p-2"
                            />
                        </div>
                        <div className="flex flex-col gap-1 relative">
                            <label
                            className={`absolute left-2 transition-all ease-out ${
                                (college || selectedCollege) && (selectedCollege !== '' && selectedCollege !== '--Choose College--')
                                ? 'top-0 text-[10px] text-primPurple'
                                : 'top-3 text-xs text-gray-400'
                            }`}
                            style={{ pointerEvents: 'none' }}
                            >
                            College
                            </label>
                            <input
                                id='fname'
                                type="text"
                                value={selectedCollege}
                                onChange={handlecollegeChange}
                                className="border border-primPurple rounded-md outline-none text-sm text-gray-600 w-auto h-10 p-2"
                            />
                            <div
                            className="absolute inset-y-0 right-0 pr-1 flex items-center text-primPurple cursor-pointer"
                            onClick={() => setShowDropdown(!showDropdown)}
                            >
                            <RiArrowDropDownLine size={28} />
                            </div>
                            {showDropdown && (
                            <div className="absolute h-[112px] text-xs overflow-y-auto mt-9 border border-primPurple rounded-md bg-white shadow-md z-10">
                                {colleges.map((college) => (
                                <CollegeOptions
                                    key={college}
                                    option={college}
                                    onSelect={handleSelectCollege}
                                />
                                ))}
                            </div>
                            )}
                        </div>
                    </div>
                    <p className="text-gray-400 text-xs md:text-sm">Already registered? <a href="/login" className="text-primPurple font-medium"><u>Sign In</u></a></p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <button 
                        onClick={handleSignupRequest}
                        className="bg-primPurple text-white font-semibold p-2 rounded-full w-[102px] md:w-[142px] lg:w-[182px]"
                        type="submit"
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Signup;