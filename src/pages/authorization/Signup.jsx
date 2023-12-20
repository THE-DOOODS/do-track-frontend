import React, { useRef, useState } from 'react';
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import { IoClose } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Tooltip } from "react-tooltip";
import ChooseOptions from '../../components/ChooseOptions';
import { useNavigate } from 'react-router';
import { Toaster, toast } from 'sonner';
import LoadingBar from 'react-top-loading-bar';

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

    const [fnameError, setFnameError] = useState(false);
	const [lnameError, setLnameError] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [idError, setIdError] = useState(false);
	const [passError, setPassError] = useState(false);
	const [cPassError, setCPassError] = useState(false);
	const [positionError, setPositionError] = useState(false);
	const [collegeError, setCollegeError] = useState(false);

    const positions = ['--Choose Position--', 'Governor', 'Vice Governor', 'Secretary', 'Secretary for Administration', 'Treasurer', 'Business Manager', 'Others'];
    const colleges = ['--Choose College--', 'CCIS', 'CEGS', 'CED', 'CAA', 'CMNS', 'CHASS', 'COFES'];

    const emailRegex = /^[a-zA-Z0-9._-]+@carsu\.edu\.ph$/;

    const [selectedPosition, setSelectedPosition] = useState('');
    const [showPosDropdown, setShowPosDropdown] = useState('');
    const [isOthersSelected, setIsOthersSelected] = useState(false);
    const [selectedCollege, setSelectedCollege] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    const [type, setType] = useState("password");

    const navigator = useNavigate();
    const loadingBar = useRef(null);
    const promise = () => new Promise((resolve) => setTimeout(resolve, 1000));
  
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

    const handleSelectPosition = (position) => {
        if (position !== '--Choose Position--') {
            setSelectedPosition(position);
            if (position === 'Governor') {
                setPosition("Governor");
            } else if (position === 'Vice Governor') {
                setPosition("Vice Governor");
            } else if (position === 'Secretary') {
                setPosition("Secretary");
            } else if (position === 'Secretary for Administration') {
                setPosition("Secretary for Administration");
            } else if (position === 'Treasurer') {
                setPosition("Treasurer");
            } else if (position === 'Business Manager') {
                setPosition("Business Manager");
            } else if (position === 'Others') {
                setIsOthersSelected(true);
            } else {
                setIsOthersSelected(false);
            }
        } else {
            setSelectedPosition('');
        }
        setShowPosDropdown(false);
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

    const handleSignupRequest = async (event) => {
        event.preventDefault();
        loadingBar.current.continuousStart(60);

        setFnameError(false);
		setLnameError(false);
		setEmailError(false);
		setIdError(false);
		setPassError(false);
		setCPassError(false);
		setPositionError(false);
		setCollegeError(false);

        const fields = [
            {value: college, setError: setCollegeError, message: "College is required"},
            {value: position, setError: setPositionError, message: "Position is required"},
            {value: inputCPass, setError: setCPassError, message: "Confirm Password is required"},
            {value: password, setError: setPassError, message: "Password is required"},
            {value: admin_id, setError: setIdError, message: "Student ID is required"},
            {value: email, setError: setEmailError, message: "Email is required"},
            {value: last_name, setError: setLnameError, message: "Last name is required"},
            {value: first_name, setError: setFnameError, message: "First name is required"},
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


        // if (first_name === "") {
        //     toast.error('First name required')
        // } else if (last_name === "") {
        //     toast.error('Last name required')
        // } else if (email === "") {
        //     toast.error('Email required')
        // } else if (admin_id === "") {
        //     toast.error('Student ID required')
        // } else if (password === "") {
        //     toast.error('Password required')
        // } else if (inputCPass === "") {
        //     toast.error('Confirm password required')
        // } else if (position === "") {
        //     toast.error('Position required')
        // } else if (college === "") {
        //     toast.error('College required')
        // } else 

        if (isValid) {
            if (!(password.length >= 8)) {
                loadingBar.current.complete();
                toast.error('Password must be at least 8 characters');
                setPassError(true);
            } else if (email !== "" && !emailRegex.test(email)) {
                loadingBar.current.complete();
                toast.error('Please use university email')
                setEmailError(true);
            } else if (password !== inputCPass) {
                loadingBar.current.complete();
                toast.error('Password not matched!');
                setPassError(true);
                setCPassError(true);
            } else {
                try {

                    let response = await fetch("https://do-track-backend-production.up.railway.app/api/register", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                        body: JSON.stringify({
                            admin_id,
                            first_name,
                            last_name,
                            email,
                            password,
                            position,
                            college_id: college,
                        }),
                    });
                    const data = await response.json();

                    if (response.ok) {
                        toast.promise(promise, {
							loading: 'Creating...',
							success: () => {
							  return `Account created`;
							},
							error: 'Error',
						});
                        setTimeout(() => {
                            loadingBar.current.complete();
                            setTimeout(() => {
                                navigator("/login");
                            }, 1200);
                        }, 1000);
                    } else if (response.status === 422 && data.message === "The admin id has already been taken.") {
                            loadingBar.current.complete();
                            toast.error('Student ID already in use');
                            setIdError(true);
                    } else if (response.status === 422 && data.message === "The email has already been taken.") {
                         loadingBar.current.complete();
                         toast.error('Email already in use');
                         setEmailError(true);
                    } else {
                        loadingBar.current.complete();
                        toast.error('Email and ID already in use');
                        setEmailError(true);
                        setIdError(true);
                    }
                    
                    
                } catch (err) {
                    loadingBar.current.complete();
                    toast.warning('Internal Server Error');
                    console.log(err);
                }
            }
        }

    }

    return (
        <div className="flex flex-col justify-center items-center bg-gradient-to-b from-primPurple to-primOrange h-screen w-full p-4">
            <Toaster position='top-right' closeButton richColors />
            <LoadingBar height={7} color='#4ab516' ref={loadingBar} />
            <div className="flex flex-col gap-5 border rounded-xl bg-white p-4 lg:p-6 px-6 lg:px-8 shadow-xl w-auto">
                <div className="flex flex-col items-center">
                    <img src="/static/icons/Logo.png" alt="Do-Track Logo" className="w-[166px] pb-2" />
                    <h1 className="text-primPurple text-xl md:text-3xl font-semibold">Create Account</h1>
                </div>
                    <div className="flex flex-col items-start gap-1">
                        <form>
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
                                            className={` ${ 
                                                fnameError 
                                                    ? "border border-red-500 rounded-md outline-none text-sm text-gray-600 w-auto h-10 p-2"
                                                    : "border border-primPurple rounded-md outline-none text-sm text-gray-600 w-auto h-10 p-2"
                                            }`}
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
                                            id='lname'
                                            type="text"
                                            value={last_name}
                                            onChange={handlelast_nameChange}
                                            className={` ${ 
                                                lnameError 
                                                    ? "border border-red-500 rounded-md outline-none text-sm text-gray-600 w-auto h-10 p-2"
                                                    : "border border-primPurple rounded-md outline-none text-sm text-gray-600 w-auto h-10 p-2"
                                            }`}
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
                                        id='email'
                                        type="text"
                                        value={email}
                                        onChange={handleemailChange}
                                        data-tooltip-id="emailTooltip"
                                        className= {`${
                                            emailError
                                                ? "border border-red-500 rounded-md outline-none text-sm text-gray-600 w-auto h-10 p-2"
                                                : "border border-primPurple rounded-md outline-none text-sm text-gray-600 w-auto h-10 p-2"
                                        }`}
                                    />
                                <Tooltip
                                        id="emailTooltip"
                                        place="bottom"
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
                                        id='studid'
                                        type="text"
                                        value={admin_id}
                                        onChange={handleInputadminIdChange}
                                        data-tooltip-id="IDTooltip"
                                        className={`${
                                            idError
                                                ? "border border-red-500 rounded-md outline-none text-sm text-gray-600 w-auto h-10 p-2"
                                                : "border border-primPurple rounded-md outline-none text-sm text-gray-600 w-auto h-10 p-2"
                                        }`}
                                    />
                                    <Tooltip
                                        id="IDTooltip"
                                        place="bottom"
                                        className="z-20"
                                        border="1px solid #5A5DFA"
                                        // style={{ background: "linear-gradient(to bottom, #AD31C1, #E7A557)" }}
                                        style={{background:"white"}}
                                        >
                                        <div className="text-xs text-black">
                                            <h1>e.g. 211-00000</h1>
                                        </div>
                                    </Tooltip>
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
                                        id='pass'
                                        type={type}
                                        value={password}
                                        onChange={handlepasswordChange}
                                        className={`${
                                            passError
                                                ? "border border-red-500 rounded-md outline-none text-sm text-gray-600 w-auto h-10 p-2"
                                                : "border border-primPurple rounded-md outline-none text-sm text-gray-600 w-auto h-10 p-2"
                                        }`}
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
                                        id='cpass'
                                        type={showCPassword ? "text" : "password"}
                                        value={inputCPass}
                                        onChange={handleInputCPassChange}
                                        className={`${
                                            cPassError
                                                ? "border border-red-500 rounded-md outline-none text-sm text-gray-600 w-auto h-10 p-2"
                                                : "border border-primPurple rounded-md outline-none text-sm text-gray-600 w-auto h-10 p-2"
                                        }`}
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
                                            (position || selectedPosition) && (selectedPosition !== '' && selectedPosition !== '--Choose Position--')
                                                 ? 'top-0 text-[10px] text-primPurple'
                                                 : 'top-3 text-xs text-gray-400'
                                        }`}
                                        style={{ pointerEvents: 'none' }}
                                    >
                                        Position
                                    </label>
                                    <input
                                        id='position'
                                        type="text"
                                        value={isOthersSelected ? position : selectedPosition}
                                        onChange={handlepositionChange}
                                        onClick={() => setShowPosDropdown(!showPosDropdown)}
                                        className={`${
                                            positionError
                                                ? "border border-red-500 rounded-md outline-none text-sm text-gray-600 w-auto h-10 p-2 cursor-pointer"
                                                : "border border-primPurple rounded-md outline-none text-sm text-gray-600 w-auto h-10 p-2 cursor-pointer"
                                        }`}
                                    />
                                    <div
                                    className="absolute inset-y-0 right-0 pr-1 flex items-center text-primPurple cursor-pointer"
                                    onClick={() => setShowPosDropdown(!showPosDropdown)}
                                    >
                                    <RiArrowDropDownLine size={28} />
                                    </div>
                                    {showPosDropdown && (
                                    <div className="absolute w-full h-[112px] text-xs overflow-y-auto mt-9 border border-primPurple rounded-md bg-white shadow-md z-10">
                                        {positions.map((position) => (
                                        <ChooseOptions
                                            key={position}
                                            option={position}
                                            onSelect={handleSelectPosition}
                                        />
                                        ))}
                                    </div>
                                    )}
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
                                        id='college'
                                        type="text"
                                        value={selectedCollege}
                                        onChange={handlecollegeChange}
                                        onClick={() => setShowDropdown(!showDropdown)}
                                        className={`${
                                            collegeError
                                                ? "border border-red-500 rounded-md outline-none text-sm text-gray-600 w-auto h-10 p-2 cursor-pointer"
                                                : "border border-primPurple rounded-md outline-none text-sm text-gray-600 w-auto h-10 p-2 cursor-pointer"
                                        }`}
                                    />
                                    <div
                                    className="absolute inset-y-0 right-0 pr-1 flex items-center text-primPurple cursor-pointer"
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    >
                                    <RiArrowDropDownLine size={28} />
                                    </div>
                                    {showDropdown && (
                                    <div className="absolute w-full h-[112px] text-xs overflow-y-auto mt-9 border border-primPurple rounded-md bg-white shadow-md z-10">
                                        {colleges.map((college) => (
                                        <ChooseOptions
                                            key={college}
                                            option={college}
                                            onSelect={handleSelectCollege}
                                        />
                                        ))}
                                    </div>
                                    )}
                                </div>
                            </div>
                        </form>
                        <p className="text-gray-400 text-xs md:text-sm">Already registered? <a href="/login" className="text-primPurple transition duration-500 hover:text-purple-200 font-medium"><u>Sign In</u></a></p>
                    </div>
                <div className="flex flex-col items-center justify-center">
                    <button 
                        onClick={handleSignupRequest}
                        className="bg-primPurple transition duration-500 hover:scale-105 hover:bg-purple-200 text-white font-semibold p-2 rounded-full w-[102px] md:w-[142px] lg:w-[182px]"
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