import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AdminSidebar } from "./AdminSidebar";
import { AdminNavbar } from "./AdminNavbar";

function AdminLayout() {
	const [isCollapsed, setIsCollapsed] = useState(false);

	return (
		<div className="flex min-h-screen bg-gray-50">
			<AdminSidebar isCollapsed={isCollapsed} />
			<div className="flex-1">
				<AdminNavbar
					isCollapsed={isCollapsed}
					setIsCollapsed={setIsCollapsed}
				/>
				<Outlet />
			</div>
		</div>
	);
}

export default AdminLayout;
