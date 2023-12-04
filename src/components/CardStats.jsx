import { RiBuilding2Line } from 'react-icons/ri';
import { IoIosPeople } from "react-icons/io";
import randomColor from 'randomcolor';

const CardStats = () => {
    const randColor = randomColor({ format: 'hex' });

    const randomBgColor = {
        background: `${randColor}40`,
    };

    const randomBgColor2 = {
        background: `${randColor}70`,
    };
    
    return (
        <div>
            <div className={`flex flex-col justify-between w-[278px] h-[166px] border rounded-xl p-4 border-gray-300`} style={randomBgColor}>
                <div className="flex items-center justify-between z-10">
                    <RiBuilding2Line className="text-black" />
                    <p className="text-[9px] font-normal text-black">Bachelor of Science in <span className="font-bold">Computer Sciences</span></p>
                </div>
                <div className="flex py-5 gap-5 items-center text-black z-10">
                    <div className="border rounded-xl p-4 opacity-80" style={randomBgColor2}>
                        <IoIosPeople className='text-white' size={22}/>
                    </div>
                    <h1 className="flex flex-col text-5xl font-black">
                        50%
                        <span className="text-sm font-normal">of the population</span>
                    </h1>
                </div>
                <div className="flex justify-between text-[9px] text-black z-10">
                    <p>350 out of 700</p>
                    <p className="text-green-500">+23 attendees for the last hour</p>
                </div>
            </div>
        </div>
    );
};

export default CardStats;