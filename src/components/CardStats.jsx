import { RiBuilding2Line } from 'react-icons/ri';
import { IoIosPeople } from "react-icons/io";
import randomColor from 'randomcolor';
import { useEffect, useState } from 'react';

const ProgramStats = ({ statData }) => {
    const randomBgColor2 = {
      background: `${randomColor({ format: 'hex' })}70`,
    };
  
    return (
      <div className="flex flex-col py-1 gap-3 items-end text-black z-10">
        <div className='flex'>
            <div className="border rounded-xl p-5 opacity-80" style={randomBgColor2}>
                <IoIosPeople className="text-white" size={18} />
            </div>
            <h1 className="flex flex-col text-4xl font-black px-5">
                {Math.round(statData?.student_percentage * 100)/100}%
            <span className="text-xs font-normal">of the population</span>
            </h1>
        </div>
        <div className="flex justify-end text-[8px] text-green-600 z-10 font-bold">
          <p>
          {statData?.attendees?.[0]?.attendees_count} out of {statData?.total_students?.[0]?.total_population}
          </p>
        </div>
      </div>
    );
  };
  
  const CardStats = ({ programInfo }) => {
    const [statsData, setStatsData] = useState([]);
  
    const handleStatsRequest = async (programId) => {
      try {
        let response = await fetch(
          `https://do-track-backend-production.up.railway.app/api/attendance/college-info/${programId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          }
        );
  
        if (response.ok) {
          const data = await response.json();
          setStatsData((prevStatsData) => [
            ...prevStatsData,
            { programId, data },
          ]);
        }
      } catch (err) {
        console.log(err);
      }
    };
  
    useEffect(() => {
      programInfo?.programs?.forEach((data) => {
        handleStatsRequest(data?.program_id);
      });
    }, [programInfo]);
  
    return (
      <div className="flex gap-4">
        {programInfo?.programs?.map((data, key) => (
          <div
            key={key}
            className={`flex flex-col justify-between w-[248px] h-[126px] border rounded-xl p-3 border-gray-300`}
            style={{ background: `${randomColor({ format: 'hex' })}40` }}
          >
            <div className="flex items-center justify-between z-10">
              <RiBuilding2Line className="text-black" />
              <p
                className="text-[8px] font-semibold text-black"
                onClick={() => handleStatsRequest(data?.program_id)}
              >
                {data?.program_name}
              </p>
            </div>
            {statsData.find((stat) => stat.programId === data?.program_id) && (
              <ProgramStats
                statData={statsData.find((stat) => stat.programId === data?.program_id).data}
              />
            )}
          </div>
        ))}
      </div>
    );
  };
  
  export default CardStats;