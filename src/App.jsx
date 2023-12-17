
import { BrowserRouter as Routers, Routes, Route } from "react-router-dom";
import Login from "./pages/authorization/Login";
import Signup from "./pages/authorization/Signup";
import Dashboard from "./pages/interface/Dashboard";
import LandingPage from "./pages/interface/LandingPage";
import Logout from "./components/modals/Logout";

function App() {
	return (
		<>
			<Routers>
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/logout" element={<Logout />} />
				</Routes>
			</Routers>
		</>
	);
}

export default App;
