// import { RiArrowDropDownLine } from "react-icons/ri";
// import { useEffect, useState } from "react";
// // import StudentStats from "./StudentStats";

// const Overviewbar = ({ programInfo }) => {
//   const [program, setProgram] = useState(false);
//   const [programData, setProgramData] = useState([]);
//   const [programAttend, setProgramAttend] = useState([]);
  
//   useEffect(() => {
//     setProgramData(programInfo.programs);
//   }, [programInfo]);

  
//   const handleProgramClick = (programId) => {
//     console.log(programId);
//     handleAttendProgramRequest(programId);
//     setProgram(false);
//   };

//   const toggleProgram = () => {
//     if (program) {
//         setProgram(false);
//     } else {
//         setProgram(true);
//     }
//   };


//   const handleAttendProgramRequest = async (programId) => {
//     try {
//       let response = await fetch(
//         `https://do-track-backend-production.up.railway.app/api/attendance/getStudentAttendees/${programId}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//           },
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();
//         setProgramAttend(data?.data);
//       }
//     } catch (err) {
//       console.log("Unable to fetch attendance by program");
//     }
//   };

//   return (
//     <div className="flex items-center justify-between pb-5">
//       <div className="flex items-center gap-2">
//         <h1 className="font-bold text-2xl text-primPurple">Overview</h1>
//         <div className="flex items-center">
//           <img
//             src="static/icons/CCIS-logo.png"
//             alt="CCIS-logo"
//             className="w-[42px]"
//           />
//           {programInfo?.college?.map((data, key) => (
//             <p key={key} className="text-sm text-gray-500">
//               {data?.college_name}
//             </p>
//           ))}
//         </div>
//       </div>
//       <button
//         onClick={toggleProgram}
//         className="flex items-center gap-2 border p-1 px-5 rounded-full bg-gray-300 text-gray-700 font-medium text-sm"
//       >
//         Select Program <RiArrowDropDownLine size={28} />
//       </button>
//       {program && (
//         <div className="z-30 absolute right-16 top-[134px] mt-2 bg-gray-200 rounded-lg shadow w-auto">
//           <ul className="py-2 text-sm text-gray-700">
//             {programData?.map((data, key) => (
//               <li key={key}>
//                 <h1
//                   onClick={() => handleProgramClick(data?.program_id)}
//                   className="flex px-4 py-2 hover:bg-gray-100 w-full"
//                 >
//                   {data?.program_name}
//                 </h1>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Overviewbar;
