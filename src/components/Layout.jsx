import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

function App() {
	const [isCollapsed, setIsCollapsed] = useState(false);

	return (
		<div className="flex min-h-screen bg-gray-50">
			<Sidebar isCollapsed={isCollapsed} />
			<div className="flex-1">
				<Navbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
				<Outlet />
			</div>
		</div>
	);
}

export default App;
