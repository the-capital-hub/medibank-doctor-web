import { useState } from "react";
import { ArrowLeft, CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import ConsultationContent from "./ConsultationContent";
import DiagnosticTestsPopup from "./Popups/DiagnosticTestsPopup";
import MedicationPopup from "./Popups/MedicationPopup";
import NewConsultationPopup from "./Popups/NewConsultationPopup";
import Add_Icon from "../Images/Add-Icon.png";
import VitalsCard from "./Popups/components/VitalsCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import PatientSearchPopup from "./Popups/PatientSearchPopup";
import { useSelector } from 'react-redux';

const consultationData = {
	patientSummary: {
		diagnosis: [
			{
				complaint: "Pain in left ankle",
				date: "30 Jan 2024",
				doctor: "Dr Jane Smith",
				color: "bg-blue-50",
			},
			{
				complaint: "Flu symptoms",
				date: "15 Dec 2023",
				doctor: "Dr Michael Brown",
				color: "bg-green-50",
			},
		],
		vitals: [
			{
				complaint: "Medical History Review",
				date: "30 Jan 2024",
				doctor: "Dr Robert Lee",
				color: "bg-purple-50",
			},
			{
				complaint: "Chronic Condition Tracking",
				date: "15 Dec 2023",
				doctor: "Dr Emily White",
				color: "bg-orange-50",
			},
		],
		bmi: [
			{
				complaint: "Medication Reconciliation",
				date: "30 Jan 2024",
				doctor: "Dr Sarah Johnson",
				color: "bg-pink-50",
			},
			{
				complaint: "Prescription Update",
				date: "15 Dec 2023",
				doctor: "Dr David Kim",
				color: "bg-yellow-50",
			},
		],
		procedures: [
			{
				complaint: "Allergy Screening",
				date: "30 Jan 2024",
				doctor: "Dr John Doe",
				color: "bg-red-50",
			},
			{
				complaint: "Allergen Sensitivity Test",
				date: "15 Dec 2023",
				doctor: "Dr Lisa Chen",
				color: "bg-teal-50",
			},
		],
	},
	diagnosis: {
		pastDiagnosis: [
			{
				complaint: "Patient Overall Health Status",
				date: "30 Jan 2024",
				doctor: "Dr Jane Smith",
				color: "bg-blue-50",
			},
			{
				complaint: "Comprehensive Health Assessment",
				date: "15 Dec 2023",
				doctor: "Dr Michael Brown",
				color: "bg-green-50",
			},
		],
	},
	reports: {
		pastReports: [
			{
				complaint: "Patient Overall Health Status",
				date: "30 Jan 2024",
				doctor: "Dr Jane Smith",
				color: "bg-blue-50",
			},
			{
				complaint: "Comprehensive Health Assessment",
				date: "15 Dec 2023",
				doctor: "Dr Michael Brown",
				color: "bg-green-50",
			},
		],
	},
};

const breadcrumbItems = [
	{ label: "Home", href: "/" },
	{ label: "Consultation", href: "/consultation" },
	{ label: "Patient Summary", href: "/consultation/summary" },
];

// Define tabs for each view
const viewTabs = {
	patientSummary: [
		{ value: "diagnosis", label: "Diagnosis" },
		{ value: "vitals", label: "Vitals" },
		{ value: "bmi", label: "BMI" },
		{ value: "procedures", label: "Procedures" },
	],
	diagnosis: [{ value: "pastDiagnosis", label: "Past Diagnosis" }],
	reports: [{ value: "pastReports", label: "Reports" }],
};

export default function ConsultationPage() {
	const [selectedView, setSelectedView] = useState("patientSummary");
	const [activeTab, setActiveTab] = useState("diagnosis");
	const [showDiagnosticTests, setShowDiagnosticTests] = useState(false);
	const [showMedication, setShowMedication] = useState(false);
	const [showNewConsultation, setShowNewConsultation] = useState(false);
	const [showPatientSearch, setShowPatientSearch] = useState(false);
	const patientDetails = useSelector((state) => state.patientDetails?.data);
	console.log('Redux State:', patientDetails);

	// Handler for select change
	const handleViewChange = (value) => {
		setSelectedView(value);
		// Reset to first tab of the new view
		setActiveTab(viewTabs[value][0].value);
	};

	// Get current tabs for the selected view
	const currentTabs = viewTabs[selectedView];

	// Get current consultations based on selected view and tab
	const currentConsultations = consultationData[selectedView][activeTab];

	return (
		<div className="container mx-auto p-6">
			{/* Header */}
			<div className="mb-8">
				<div className="flex justify-between items-center">
					<div className="flex items-center mb-4">
						<Button variant="ghost" asChild>
							<Link to="/">
								<ArrowLeft className="mr-2 h-4 w-4" />
							</Link>
						</Button>
						<Breadcrumbs items={breadcrumbItems} />
					</div>
					<Button
						variant="contained"
						className="m-3 bg-indigo-800 text-white text-center"
						onClick={() => setShowPatientSearch(true)}
					>
						Patient MID
					</Button>
				</div>

				{/* Patient Info Card */}
				<Card className="p-4 pb-0 mb-2 ">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-3">
						<div>
							<span className="font-medium">Patient Name: </span>
							<span>{patientDetails?.medicalRecords?.appointments?.[0]?.PatientName||"N/A"}</span>
						</div>
						{/* <div>
							<span className="font-medium">MBID: </span>
							<span>M1234567890</span>
							</div> */}
						<div>
							<span className="font-medium">Date of Birth: </span>
							<span>{patientDetails?.patient?.date_of_birth||"N/A"}</span>
						</div>
						<div>
							<span className="font-medium">Gender: </span>
							<span>{patientDetails?.patient?.sex||"N/A"}</span>
						</div>
						{/* <div>
							<span className="font-medium">Address: </span>
							<span>Hyderabad, Telangana</span>
							</div> */}
					</div>
					<hr />
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-3 pb-3">
						<div>
							<span className="font-medium">MID: </span>
							<span>{patientDetails?.patient?.MBID||"N/A"}</span>
						</div>
						<div>
							<span className="font-medium">Address: </span>
							<span>{patientDetails?.medicalRecords?.appointments?.[0]?.address||"N/A"}</span>
						</div>
					</div>
					<hr />

					<div className="grid grid-cols-[1fr_2fr_1fr] gap-4">
						<Button
							variant="contained"
							className="m-3 bg-indigo-800 text-white text-center"
							onClick={() => setShowNewConsultation(true)}
						>
							Diagnosis{" "}
							{/* <img src={Add_Icon} alt="Add Icon" className="inline h-4 w-4" /> */}
							<CirclePlus className="inline h-4 w-4" />
						</Button>
						<Button
							variant="contained"
							className="m-3 bg-indigo-800 text-white text-center"
							onClick={() => setShowMedication(true)}
						>
							Vitals & BMI{" "}
							{/* <img src={Add_Icon} alt="Add Icon" className="inline h-4 w-4" /> */}
							<CirclePlus className="inline h-4 w-4" />
						</Button>
						<Button
							variant="contained"
							className="m-3 bg-indigo-800 text-white text-center"
							onClick={() => setShowDiagnosticTests(true)}
						>
							Procedures{" "}
							{/* <img src={Add_Icon} alt="Add Icon" className="inline h-4 w-4" /> */}
							<CirclePlus className="inline h-4 w-4" />
						</Button>
					</div>

					<hr />

					<div className="grid grid-cols-[1fr_2fr_1fr] gap-4">
						<div className=" flex flex-col justify-between">
							<div className="flex flex-col gap-3 py-4">
								{currentConsultations.map((item, index) => (
									<div
										key={index}
										className={`rounded-lg p-4 bg-blue-50 cursor-pointer max-h-fit`}
										// onClick={() => handleConsultationClick(item)}
									>
										<div className="mb-2">
											<div className="text-sm text-gray-600">
												
											</div>
											<div className="font-medium">{patientDetails?.medicalRecords?.appointments?.[0]?.chiefComplaint}</div>
										</div>
										<div className="flex justify-between text-sm text-gray-600">
											<span>{patientDetails?.medicalRecords?.appointments?.[0]?.selectDate}</span>
											<span>{patientDetails?.medicalRecords?.appointments?.[0]?.doctorName}</span>
										</div>
									</div>
								))}
							</div>
							<Button className="text-teal-500 w-fit mx-auto mb-5">
								Show All
							</Button>
						</div>
						<div className="grid grid-cols-2 gap-3 py-4">
							<div className="">
								<h2 className=" text-indigo-800 text-left mb-6">Vitals</h2>
								<div className="flex flex-wrap gap-4">
									<VitalsCard
										title="Blood Sugar"
										
										unit="mg/dL"
										status="Normal"
										trend="up"
										color="bg-orange-50"
										width={120}
									/>
									<VitalsCard
										title="Heart Rate"
										
										unit="bpm"
										status="Normal"
										trend="stable"
										color="bg-red-50"
										width={120}
									/>
									<VitalsCard
										title="Blood Pressure"
										value="102/72"
										unit="mmHg"
										status="Normal"
										trend="down"
										color="bg-blue-50"
										width={120}
									/>
									<VitalsCard
										title="SPO2"
										value="102/72"
										unit="mmHg"
										status="Normal"
										trend="down"
										color="bg-blue-50"
										width={120}
									/>
								</div>
							</div>
							{/* <hr /> */}
							<div className="">
								<h2 className=" text-indigo-800 text-left mb-5">
									BMI - <span className="text-yellow-400">26.9</span>
								</h2>
								<div className="flex flex-col lg:flex-row gap-4 items-start">
									<div className="relative w-full h-96">
										<div className="absolute right-0 w-2/2 h-full flex items-center justify-center">
											{/* <Avatar className="w-full h-full rounded-none">
												<AvatarImage
													src={`/public/Images/BMIBoy.png`}
													width={256}
													height={384}
													className="w-[100%] h-full"
													alt="Body measurements"
												/>
												<AvatarFallback>BMI Model</AvatarFallback>
											</Avatar> */}
											<img
												src="../Images/BMIBOY.png"
												className="w-[100%] h-full"
												alt="BMI Model"
											/>
										</div>
										{/* <div className="absolute left-0 top-0">
											<div className="bg-white p-2 rounded-lg shadow-sm">
												<div className="font-bold">Body Measurements</div>
												<div className="font-semibold text-sm text-gray-400">
													Last checked 2 Days Ago
												</div>
												<div className="font-semibold">
													Inverted Triangle Body Shape
												</div>
											</div>
										</div>
										<div className="absolute left-0 top-1/4">
											<div className="bg-white p-2 rounded-lg shadow-sm">
												<div className="text-sm text-gray-600">Chest (in)</div>
												<div className="font-semibold">44.5 ↑</div>
											</div>
										</div>
										<div className="absolute left-0 top-1/2">
											<div className="bg-white p-2 rounded-lg shadow-sm">
												<div className="text-sm text-gray-600">Waist (in)</div>
												<div className="font-semibold">34 ↓</div>
											</div>
										</div>
										<div className="absolute left-0 top-3/4">
											<div className="bg-white p-2 rounded-lg shadow-sm">
												<div className="text-sm text-gray-600">Hip (in)</div>
												<div className="font-semibold">42.5</div>
											</div>
										</div> */}
									</div>
									<div className="space-y-4 w-full">
										<Card className="p-4">
											<div className="text-sm text-gray-600">Height</div>
											<div className="text-xl font-semibold">170 cm</div>
										</Card>
										<Card className="p-4">
											<div className="text-sm text-gray-600">Weight</div>
											<div className="text-xl font-semibold">72 kg</div>
										</Card>
										{/* <Card
											className="p-6"
											style={{ backgroundColor: "#4A4949" }}
										>
											<div className="text-sm text-white mb-2">
												Body Mass Index (BMI)
											</div>
											<div className="text-3xl font-semibold mb-4 text-white">
												24.9
											</div>
											<div className="h-2 bg-gradient-to-r from-green-300 via-yellow-300 to-red-300 rounded-full mb-2" />
											<div className="flex justify-between text-sm text-white">
												<span>15</span>
												<span>18.5</span>
												<span>25</span>
												<span>30</span>
												<span>40</span>
											</div>
											<div className="mt-4 inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full">
												You&apos;re Healthy
											</div>
										</Card> */}
									</div>
								</div>
							</div>
						</div>
						<div className=" flex flex-col justify-between">
							<div className="flex flex-col gap-3 py-4">
								{/* {currentConsultations.map((item, index) => ( */}
									<div
										// key={index}
										className={`rounded-lg p-4 bg-blue-50 cursor-pointer max-h-fit`}
										// onClick={() => handleConsultationClick(item)}
									>
										<div className="mb-2">
											<div className="text-sm text-gray-600">
												Chief Complaint:
											</div>
											<div className="font-medium">{patientDetails?.medicalRecords?.appointments?.[0]?.chiefComplaint}</div>
										</div>
										<div className="flex justify-between text-sm text-gray-600">
											<span>{patientDetails?.medicalRecords?.appointments?.[0]?.selectDate}</span>
											<span>{patientDetails?.medicalRecords?.appointments?.[0]?.doctorName}</span>
										</div>
									</div>
								{/* ))} */}
							</div>
							<Button className="text-teal-500 w-fit mx-auto mb-5">
								Show All
							</Button>
						</div>
					</div>
				</Card>
				{/* <Card className="p-4 mb-6">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						<div>
							<span className="font-medium">MBID: </span>
							<span>M1234567890</span>
						</div>
						<div>
							<span className="font-medium">Address: </span>
							<span>Hyderabad, Telangana</span>
						</div>
					</div>
				</Card> */}

				{/* Tabs and Actions */}
				{/* <div className="flex items-center justify-between mb-6">
					<Tabs
						value={activeTab}
						onValueChange={setActiveTab}
						className="w-full"
					>
						<TabsList>
							{currentTabs.map((tab) => (
								<TabsTrigger key={tab.value} value={tab.value}>
									{tab.label}
								</TabsTrigger>
							))}
						</TabsList>
					</Tabs>
					<div className="flex gap-2 ml-4">
						<Select
							value={selectedView}
							onValueChange={handleViewChange}
							className="bg-white"
						>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Select period" />
							</SelectTrigger>
							<SelectContent className="bg-white">
								<SelectItem value="patientSummary">Patient Summary</SelectItem>
								<SelectItem value="diagnosis">Diagnosis</SelectItem>
								<SelectItem value="reports">Reports</SelectItem>
							</SelectContent>
						</Select>
						{selectedView === "diagnosis" ? (
							<Button
								variant="default"
								className="bg-green-500 hover:bg-green-600"
								onClick={() => setShowDiagnosticTests(true)}
							>
								Add Diagnosis
							</Button>
						) : selectedView === "reports" ? (
							<Button
								variant="default"
								className="bg-green-500 hover:bg-green-600"
							>
								Add Report
							</Button>
						) : (
							<Button
								variant="default"
								className="bg-green-500 hover:bg-green-600"
								onClick={() => setShowNewConsultation(true)}
							>
								Add Procedure
							</Button>
						)}
						<Button
							variant="warning"
							className="bg-yellow-500 hover:bg-yellow-600"
							onClick={() => setShowMedication(true)}
						>
							Show all
						</Button>
					</div>
				</div> */}
			</div>

			{/* Consultation Content */}
			{/* <ConsultationContent
				selectedView={selectedView}
				activeTab={activeTab}
				consultation={currentConsultations}
			/> */}
			<DiagnosticTestsPopup
				open={showDiagnosticTests}
				onOpenChange={setShowDiagnosticTests}
			/>
			<MedicationPopup open={showMedication} onOpenChange={setShowMedication} />
			<NewConsultationPopup
				open={showNewConsultation}
				onOpenChange={setShowNewConsultation}
			/>

			<PatientSearchPopup
				open={showPatientSearch}
				onOpenChange={setShowPatientSearch}
			/>
		</div>
	);
}
