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
            <div className={`flex flex-col justify-between w-[248px] h-[126px] border rounded-xl p-3 border-gray-300`} style={randomBgColor}>
                <div className="flex items-center justify-between z-10">
                    <RiBuilding2Line className="text-black" />
                    <p className="text-[8px] font-normal text-black">Bachelor of Science in <span className="font-bold">Computer Sciences</span></p>
                </div>
                <div className="flex py-1 gap-5 items-center text-black z-10">
                    <div className="border rounded-xl p-4 opacity-80" style={randomBgColor2}>
                        <IoIosPeople className='text-white' size={18}/>
                    </div>
                    <h1 className="flex flex-col text-4xl font-black">
                        50%
                        <span className="text-xs font-normal">of the population</span>
                    </h1>
                </div>
                <div className="flex justify-between text-[8px] text-black z-10 font-semibold">
                    <p>350 out of 700</p>
                    <p className="text-green-500">+23 attendees for the last hour</p>
                </div>
            </div>
        </div>
    );
};

export default CardStats;