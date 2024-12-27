import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Printer, Share2, X } from "lucide-react";

const consultations = [
	{
		complaint: "Pain in left ankle",
		date: "30 Jan 2024",
		doctor: "Dr John Doe",
		color: "bg-green-100",
	},
	{
		complaint: "Flu Symptoms",
		date: "30 Jan 2024",
		doctor: "Dr John Doe",
		color: "bg-blue-100",
	},
	{
		complaint: "Cold & Cough",
		date: "30 Jan 2024",
		doctor: "Dr John Doe",
		color: "bg-purple-100",
	},
	{
		complaint: "Skin Allergy",
		date: "30 Jan 2024",
		doctor: "Dr John Doe",
		color: "bg-orange-100",
	},
	{
		complaint: "Pain in left ankle",
		date: "30 Jan 2024",
		doctor: "Dr John Doe",
		color: "bg-red-100",
	},
	// Add more consultations as needed
];

export default function MedicoLegalDetailsDialog({
	open,
	onOpenChange,
	patient,
}) {
	const [activeTab, setActiveTab] = useState("diagnosis");

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[900px] rounded-3xl">
				<DialogHeader className="flex flex-row items-center justify-between">
					<DialogTitle className="text-xl font-semibold">
						Patient Medical Record
					</DialogTitle>
					<Button
						variant="ghost"
						size="icon"
						className="h-6 w-6"
						onClick={() => onOpenChange(false)}
					>
						<X className="h-4 w-4" />
					</Button>
				</DialogHeader>

				{/* Patient Info Header */}
				<div className="flex items-center justify-between border-b pb-4">
					<div className="grid grid-cols-6 gap-4 text-sm">
						<div>
							<span className="font-medium">Patient Name: </span>
							<span>{patient?.name || "User Name"}</span>
						</div>
						<div>
							<span className="font-medium">MLID: </span>
							<span>{patient?.mlid || "M123456/890"}</span>
						</div>
						<div>
							<span className="font-medium">Date of Birth: </span>
							<span>{patient?.dob || "01-01-1989"}</span>
						</div>
						<div>
							<span className="font-medium">Gender: </span>
							<span>{patient?.gender || "Male"}</span>
						</div>
						<div className="col-span-2">
							<span className="font-medium">Address: </span>
							<span>{patient?.address || "Hyderabad, Telangana"}</span>
						</div>
					</div>
				</div>

				<div className="flex items-center justify-between gap-5">
					{/* Tabs */}
					<Tabs
						value={activeTab}
						onValueChange={setActiveTab}
						className="w-full"
					>
						<TabsList>
							<TabsTrigger value="diagnosis">Diagnosis</TabsTrigger>
							<TabsTrigger value="vitals">Vitals</TabsTrigger>
							<TabsTrigger value="bmi">BMI</TabsTrigger>
							<TabsTrigger value="procedures">Procedures</TabsTrigger>
						</TabsList>
					</Tabs>
					<div className="flex gap-2">
						<Button variant="ghost" size="icon">
							<Printer className="h-4 w-4" />
						</Button>
						<Button variant="ghost" size="icon">
							<Share2 className="h-4 w-4" />
						</Button>
					</div>
				</div>

				{/* Consultations Grid */}
				<div className="grid grid-cols-3 gap-4 overflow-y-auto max-h-[400px] pr-2">
					{consultations.map((consultation, index) => (
						<div key={index} className={`${consultation.color} rounded-lg p-4`}>
							<div className="mb-2">
								<div className="text-sm text-gray-600">Chief Complaint:</div>
								<div className="font-medium">{consultation.complaint}</div>
							</div>
							<div className="flex justify-between text-sm text-gray-600">
								<span>{consultation.date}</span>
								<span>{consultation.doctor}</span>
							</div>
						</div>
					))}
				</div>
			</DialogContent>
		</Dialog>
	);
}
