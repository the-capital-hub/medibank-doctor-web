import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import ConsultationContent from "@/components/consultationContent";

// Comprehensive data structure with nested views and tabs
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
				<Button variant="ghost" className="mb-4">
					<Link to="/">
						<ArrowLeft className="mr-2 h-4 w-4" />
					</Link>
					Consultation
				</Button>

				{/* Patient Info Card */}
				<Card className="p-4 mb-6">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
						<div>
							<span className="font-medium">Patient Name: </span>
							<span>User Name</span>
						</div>
						<div>
							<span className="font-medium">MLID: </span>
							<span>M1234567890</span>
						</div>
						<div>
							<span className="font-medium">Date of Birth: </span>
							<span>01-01-1989</span>
						</div>
						<div>
							<span className="font-medium">Gender: </span>
							<span>Male</span>
						</div>
						<div>
							<span className="font-medium">Address: </span>
							<span>Hyderabad, Telangana</span>
						</div>
					</div>
				</Card>

				{/* Tabs and Actions */}
				<div className="flex items-center justify-between mb-6">
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
						<Button
							variant="default"
							className="bg-green-500 hover:bg-green-600"
						>
							Add
						</Button>
						<Button
							variant="warning"
							className="bg-yellow-500 hover:bg-yellow-600"
						>
							Show all
						</Button>
					</div>
				</div>
			</div>

			{/* Consultation Content */}
			<ConsultationContent
				selectedView={selectedView}
				activeTab={activeTab}
				consultation={currentConsultations}
			/>
		</div>
	);
}
