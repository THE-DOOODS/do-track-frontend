import Topbar from "../../components/Topbar";
import Overviewbar from "../../components/Overviewbar";
import Statistics from "../../components/Statistics";
import StudentLists from "../../components/StudentLists";

const Dashboard = () => { 

    return (
        <div className="flex flex-col mt-20 py-6 px-16">
            <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50 px-16 pt-6">
                <Topbar />
            </div>
            <Overviewbar />
            <hr />
            <Statistics />
            <StudentLists />
        </div>
    );
};

export default Dashboard;