import { useEffect } from "react";
import CardStats from "./CardStats";


const Statistics = ({programInfo}) => {

    console.log(programInfo);

    return (
        <div className="flex pt-5 pb-2 overflow-x-auto">
            <CardStats programInfo={programInfo} />
        </div>
    );
};

export default Statistics;