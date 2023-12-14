
const LandingPage = () => {
    return (
        <div className="flex flex-col justify-center items-center gap-6 bg-gradient-to-b from-primPurple to-primOrange h-screen w-full p-4">
            <div className="flex flex-col items-center bg-white p-10 rounded-lg">
                <img src="./public/static/icons/Logo.png" alt="" className="w-[264px]" />
                <div className="flex flex-col items-center gap-8">
                    <h1 className="text-2xl text-center w-auto lg:w-[534px] text-primPurple">
                        Do-Day Activity Attendance and Management System
                    </h1>
                    <a href="/login">
                        <button className="p-3 w-[148px] text-white font-semibold bg-primPurple rounded-full">
                            Get Started
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
