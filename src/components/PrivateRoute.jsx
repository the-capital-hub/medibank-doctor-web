import { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Outlet } from "react-router-dom";

import { Logo } from "../components/logo";
import { SidebarNav } from "../components/sidebar-nav";
import { Search } from "../components/search";
import { UserNav } from "../components/user-nav";

function App() {
	const [isCollapsed, setIsCollapsed] = useState(false);

	return (
		<div className="flex min-h-screen bg-gray-50">
			{/* Sidebar */}
			<div className={`border-r bg-white ${isCollapsed ? "w-16" : "w-64"} p-6`}>
				<div className="flex flex-col gap-8">
					<Logo />
					<SidebarNav isCollapsed={isCollapsed} />
				</div>
			</div>

			{/* Main Content */}
			<div className="flex-1">
				{/* Header */}
				<header className="border-b bg-white">
					<div className="flex h-16 items-center gap-4 px-6">
						<Button
							variant="ghost"
							size="icon"
							className="md:hidden"
							onClick={() => setIsCollapsed(!isCollapsed)}
						>
							<Bell className="h-4 w-4" />
							<span className="sr-only">Toggle sidebar</span>
						</Button>
						<div className="ml-auto flex items-center gap-4">
							<Search />
							<Button variant="ghost" size="icon">
								<Bell className="h-4 w-4" />
								<span className="sr-only">Notifications</span>
							</Button>
							<UserNav />
						</div>
					</div>
				</header>

				{/* Main Content */}
				<Outlet />
			</div>
		</div>
	);
}

export default App;
