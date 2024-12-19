import { useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import {
	Home,
	Stethoscope,
	Clipboard,
	ChevronDown,
	ChevronRight,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Logo } from "../logo";
import PushNotificationPopup from "./Popups/PushNotificationPopup";
import MedicoLegalPopup from "./Popups/MedicoLegalPopup";
import MedicoLegalSMSPopup from "./Popups/MedicoLegalSMSPopup";
import MedicoLegalDetailsPopup from "./Popups/MedicoLegalDetailsPopup";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";

const items = [
	{
		title: "Admin Dashboard",
		icon: Home,
		href: "/admin/dashboard",
		items: [
			{ title: "Medico Legal", href: "/admin/medico-legal" },
			{ title: "Customer Service", href: "/admin/customer-service" },
			{ title: "Push Notification", href: "/admin/push-notification" },
		],
	},
];

export function AdminSidebar({ isCollapsed, className = "" }) {
	const [showNotification, setShowNotification] = useState(false);
	const [showMedicoLegal, setShowMedicoLegal] = useState(false);
	const [showSMSPopup, setShowSMSPopup] = useState(false);
	const [showDetailsPopup, setShowDetailsPopup] = useState(false);
	const [openSections, setOpenSections] = useState(
		items.reduce((acc, item) => ({ ...acc, [item.title]: true }), {})
	);
	const location = useLocation();

	const handleRequestClick = useCallback((e) => {
		e.preventDefault();
		setShowNotification(true);
	}, []);
	const handleMedicoLegalClick = useCallback((e) => {
		e.preventDefault();
		setShowMedicoLegal(true);
	}, []);

	// const handleRequestSubmit = useCallback((requestDetails) => {
	// 	// Close the dialog
	// 	setShowRequestDialog(false);

	// 	// Show success toast
	// 	toast.success("Request sent successfully!", {
	// 		position: "top-right",
	// 		autoClose: 3000,
	// 		hideProgressBar: false,
	// 		closeOnClick: true,
	// 		pauseOnHover: true,
	// 		draggable: true,
	// 	});
	// }, []);

	const toggleSection = (sectionTitle) => {
		setOpenSections((prev) => ({
			...prev,
			[sectionTitle]: !prev[sectionTitle],
		}));
	};

	return (
		<>
			<div className={`border-r bg-white ${isCollapsed ? "w-16" : "w-64"} p-6`}>
				<div className="flex flex-col gap-8">
					<Logo />
					<div className={`flex flex-col gap-4 ${className || ""}`}>
						{items.map((item, index) => (
							<Collapsible
								key={index}
								open={!isCollapsed && openSections[item.title]}
								onOpenChange={() => !isCollapsed && toggleSection(item.title)}
							>
								<CollapsibleTrigger
									className={`
                    flex items-center gap-2 text-gray-700
                    hover:text-purple-700 transition-colors w-full
                    ${isCollapsed ? "justify-center" : ""}
                    ${
											location.pathname === item.href
												? "text-purple-700 font-semibold"
												: ""
										}
                  `}
									onClick={() => !isCollapsed && toggleSection(item.title)}
								>
									<Link
										to={item.href}
										className="flex items-center gap-2 flex-grow"
									>
										<item.icon className="h-4 w-4" />
										{!isCollapsed && <span>{item.title}</span>}
									</Link>

									{!isCollapsed && (
										<div>
											{openSections[item.title] ? (
												<ChevronDown className="h-4 w-4" />
											) : (
												<ChevronRight className="h-4 w-4" />
											)}
										</div>
									)}
								</CollapsibleTrigger>

								{!isCollapsed && (
									<CollapsibleContent>
										<div className="flex flex-col gap-2 pl-6 mt-2">
											{item.items.map((subItem, subIndex) => (
												<Link
													key={subIndex}
													to={subItem.href}
													className={`
                            text-sm text-gray-600
                            hover:text-purple-700 transition-colors
                            ${
															location.pathname === subItem.href
																? "text-purple-700 font-semibold"
																: ""
														}
                          `}
													onClick={
														subItem.title === "Push Notification"
															? handleRequestClick
															: subItem.title === "Medico Legal"
															? handleMedicoLegalClick
															: undefined
													}
												>
													{subItem.title}
												</Link>
											))}
										</div>
									</CollapsibleContent>
								)}
							</Collapsible>
						))}

						<PushNotificationPopup
							open={showNotification}
							onOpenChange={setShowNotification}
						/>
						<MedicoLegalPopup
							open={showMedicoLegal}
							onOpenChange={setShowMedicoLegal}
						/>
						<MedicoLegalSMSPopup
							open={showSMSPopup}
							onOpenChange={setShowSMSPopup}
						/>
						<MedicoLegalDetailsPopup
							open={showDetailsPopup}
							onOpenChange={setShowDetailsPopup}
						/>
					</div>
				</div>
			</div>

			{/* Toast Container */}
			<ToastContainer />
		</>
	);
}
