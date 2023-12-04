
import { BrowserRouter as Routers, Routes, Route } from "react-router-dom";
import Login from "./pages/authorization/Login";
import Signup from "./pages/authorization/Signup";
import Dashboard from "./pages/interface/Dashboard";

function App() {
	return (
		<>
			<Routers>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/dashboard" element={<Dashboard />} />
				</Routes>
			</Routers>
		</>
	);
}

export default App;
