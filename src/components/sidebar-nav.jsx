import { useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequestToAdminPopup from "./Popups/RequestToAdminPopup";

const items = [
	{
		title: "Doctor Dashboard",
		icon: Home,
		href: "/",
		items: [
			{ title: "Consultation", href: "/consultation" },
			{ title: "List of patients", href: "/patients" },
			{ title: "Payment Receipts", href: "/payments" },
			{ title: "Request to admin", href: "/admin" },
		],
	},
];

export function SidebarNav({ isCollapsed, className = "" }) {
	const [showRequestDialog, setShowRequestDialog] = useState(false);
	const location = useLocation();

	const handleRequestClick = useCallback((e) => {
		e.preventDefault();
		setShowRequestDialog(true);
	}, []);

	const handleRequestSubmit = useCallback((requestDetails) => {
		// Close the dialog
		setShowRequestDialog(false);

		// Show success toast
		toast.success("Request sent successfully!", {
			position: "top-right",
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
		});
	}, []);

	return (
		<>
			<div className={`flex flex-col gap-4 ${className || ""}`}>
				{items.map((item, index) => (
					<div key={index} className="flex flex-col gap-2">
						<Link
							to={item.href}
							className={`
						flex items-center gap-2 text-gray-700
						hover:text-purple-700 transition-colors
						${isCollapsed ? "justify-center" : ""}
						${location.pathname === item.href ? "text-purple-700 font-semibold" : ""}
					`}
						>
							<item.icon className="h-4 w-4" />
							{!isCollapsed && <span>{item.title}</span>}
						</Link>

						{!isCollapsed && item.items.length > 0 && (
							<div className="flex flex-col gap-2 pl-6">
								{item.items.map((subItem, subIndex) => (
									<Link
										key={subIndex}
										to={subItem.href}
										className={`
									text-sm text-gray-600
									hover:text-purple-700 transition-colors
									${location.pathname === subItem.href ? "text-purple-700 font-semibold" : ""}
								`}
										onClick={
											subItem.title === "Request to admin"
												? handleRequestClick
												: undefined
										}
									>
										{subItem.title}
									</Link>
								))}
							</div>
						)}
					</div>
				))}

				<RequestToAdminPopup
					open={showRequestDialog}
					onOpenChange={setShowRequestDialog}
					onSubmit={handleRequestSubmit}
				/>
			</div>

			{/* Toast Container */}
			<ToastContainer />
		</>
	);
}

