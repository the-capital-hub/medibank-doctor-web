import { useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
	// DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { Search } from "./search";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LogoutAlertPopup from "./Popups/LogoutAlertPopup";
import SubscriptionPopup from "./Popups/SubscriptionPopup";
import Avtar from "../Images/DummyPic1.png";

export function Navbar({ isCollapsed, setIsCollapsed }) {
	const [showLogoutAlert, setShowLogoutAlert] = useState(false);
	const [showSubscription, setShowSubscription] = useState(false);

	const handleLogout = () => {
		// Add your logout logic here
		console.log("Logging out...");
		setShowLogoutAlert(false);
	};
	return (
		<>
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
						<div className="flex-1">
							<h3 className="text-lg font-semibold">Welcome Back...!</h3>
							{/* <p className="text-sm text-muted-foreground">
								Get your latest updates for the last 7 days
							</p> */}
						</div>

						<div className="ml-auto flex items-center gap-4">
							{/* Search */}
							{/* <Search /> */}
							{/* Notifications */}
							<Button variant="ghost" size="icon">
								<Bell className="h-4 w-4" />
								<span className="sr-only">Notifications</span>
							</Button>

							{/* Profile */}
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<div className="flex items-center justify-between gap-3  cursor-pointer">
										<Button variant="ghost" className="relative h-12 w-12">
											<Avatar className="h-12 w-12 rounded-none">
												<AvatarImage src={Avtar} alt="Dr. Kiran" />
												<AvatarFallback>DK</AvatarFallback>
											</Avatar>
										</Button>
										<div className="flex flex-col gap-3">
											<p className="text-sm font-medium leading-none">
												Dr. Kiran
											</p>
											<p className="text-xs leading-none text-muted-foreground">
											Medibank Plus
											</p>
										</div>
									</div>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									className="w-56 bg-white z-50"
									align="end"
									forceMount
								>
									<DropdownMenuLabel className="font-normal">
										<div className="flex flex-col space-y-1">
											<p className="text-sm font-medium leading-none">
												Dr. Kiran
											</p>
											<p className="text-xs leading-none text-muted-foreground">
												Medibank Plus
											</p>
										</div>
									</DropdownMenuLabel>
									{/* <DropdownMenuSeparator /> */}
									<DropdownMenuItem className="cursor-pointer hover:text-purple-600">
										Profile
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() => setShowSubscription(true)}
										className="cursor-pointer hover:text-purple-600"
									>
										Settings
									</DropdownMenuItem>
									{/* <DropdownMenuSeparator /> */}
									<DropdownMenuItem
										onClick={() => setShowLogoutAlert(true)}
										className="cursor-pointer hover:text-purple-600"
									>
										Log out
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				</header>
			</div>

			<LogoutAlertPopup
				open={showLogoutAlert}
				onOpenChange={setShowLogoutAlert}
				onLogout={handleLogout}
			/>
			<SubscriptionPopup open={showSubscription} close={setShowSubscription} />
		</>
	);
}
