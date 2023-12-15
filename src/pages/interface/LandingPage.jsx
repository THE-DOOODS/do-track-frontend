
const LandingPage = () => {
    return (
        <div className="flex flex-col justify-center items-center gap-6 bg-gradient-to-b from-primPurple to-primOrange h-screen w-full p-4">
            <div className="flex flex-col items-center w-auto bg-white bg-opacity-40 p-10 rounded-xl relative z-10">
                <img src="/static/icons/Logo(white).png" alt="" className="w-[164px] md:w-[264px]" />
                <div className="flex flex-col items-center gap-8">
                    <h1 className="text-auto md:text-2xl text-center w-auto lg:w-[534px] text-white">
                        Do-Day Activity Attendance and Management System
                    </h1>
                    <a href="/login">
                        <button className="p-3 w-[148px] text-white font-semibold bg-primPurple rounded-full">
                            Get Started
                        </button>
                    </a>
                </div>
            </div>
            <img
                src="/static/images/ScannerMockUp.png"
                alt=""
                className="h-[422px] absolute -rotate-12 -translate-x-80 hidden lg:block"
            />
        </div>  
    );
};

export default LandingPage;
