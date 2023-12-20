import { Route, Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = ({ children, ...rest }) => {
	
	const token = localStorage.getItem("token");

	return token ? <Outlet /> : <Navigate to="/login" />;
};
