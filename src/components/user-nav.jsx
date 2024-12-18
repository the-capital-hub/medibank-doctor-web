import React, { useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	// DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LogoutAlertPopup from "./Popups/LogoutAlertPopup";
import SubscriptionPopup from "./Popups/SubscriptionPopup";

export function UserNav() {
	const [showLogoutAlert, setShowLogoutAlert] = useState(false);
	const [showSubscription, setShowSubscription] = useState(false);

	const handleLogout = () => {
		// Add your logout logic here
		console.log("Logging out...");
		setShowLogoutAlert(false);
	};
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="relative h-8 w-8 rounded-full">
						<Avatar className="h-8 w-8">
							<AvatarImage src="/placeholder-user.jpg" alt="Dr. Kiran" />
							<AvatarFallback>DK</AvatarFallback>
						</Avatar>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className="w-56 bg-white z-50"
					align="end"
					forceMount
				>
					<DropdownMenuLabel className="font-normal">
						<div className="flex flex-col space-y-1">
							<p className="text-sm font-medium leading-none">Dr. Kiran</p>
							<p className="text-xs leading-none text-muted-foreground">
								MediLog Plus
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

			<LogoutAlertPopup
				open={showLogoutAlert}
				onOpenChange={setShowLogoutAlert}
				onLogout={handleLogout}
			/>
			<SubscriptionPopup open={showSubscription} close={setShowSubscription} />
		</>
	);
}
