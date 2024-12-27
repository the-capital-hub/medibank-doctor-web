import { useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import {
	Stethoscope,
	Clipboard,
	ChevronDown,
	ChevronRight,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Logo } from "./logo";
import RequestToAdminPopup from "./Popups/RequestToAdminPopup";
import PatientSearchPopup from "./Popups/PatientSearchPopup";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";

const items = [
	{
		title: "Consultation",
		icon: Stethoscope,
		items: [
			{ title: "Patient Summary", href: "/consultation/summary" },
			{ title: "Diagnosis", href: "/consultation/diagnosis" },
			{ title: "Vitals & BMI", href: "/consultation/vitals" },
			{ title: "Health Graphs", href: "/consultation/graphs" },
			{ title: "Procedures", href: "/consultation/procedures" },
		],
	},
	{
		title: "Clinic Management",
		icon: Clipboard,
		items: [
			{ title: "Appointments", href: "/clinic/appointments" },
			{ title: "Patient List", href: "/clinic/patients" },
			{ title: "Payments", href: "/clinic/payments" },
			{ title: "Support", href: "/clinic/support" },
		],
	},
];

export function Sidebar({ isCollapsed, className = "" }) {
	const [showRequestDialog, setShowRequestDialog] = useState(false);
	const [showPatientSearchPopup, setShowPatientSearchPopup] = useState(false);
	const [openSections, setOpenSections] = useState(
		items.reduce((acc, item) => ({ ...acc, [item.title]: true }), {})
	);
	const location = useLocation();

	const handleRequestClick = useCallback((e) => {
		e.preventDefault();
		setShowRequestDialog(true);
	}, []);

	const handlePatientSearchClick = useCallback((e) => {
		e.preventDefault();
		setShowPatientSearchPopup(true);
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
														subItem.title === "Support"
															? handleRequestClick
															: subItem.title === "Patient Summary"
															? handlePatientSearchClick
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

						<RequestToAdminPopup
							open={showRequestDialog}
							onOpenChange={setShowRequestDialog}
							onSubmit={handleRequestSubmit}
						/>

						<PatientSearchPopup
							open={showPatientSearchPopup}
							onOpenChange={setShowPatientSearchPopup}
						/>
					</div>
				</div>
			</div>

			{/* Toast Container */}
			<ToastContainer />
		</>
	);
}
