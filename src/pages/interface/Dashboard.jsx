import Topbar from "../../components/Topbar";
import Overviewbar from "../../components/Overviewbar";
import Statistics from "../../components/Statistics";

const Dashboard = () => { 
    return (
        <div className="flex flex-col py-6 px-16">
            <Topbar />
            <Overviewbar />
            <hr />
            <Statistics />
        </div>
    );
};

export default Dashboard;