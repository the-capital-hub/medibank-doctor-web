// import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const consultations = [
	{
		complaint: "Pain in left ankle",
		date: "30 Jan 2024",
		doctor: "Dr John Doe",
		color: "bg-green-50",
	},
	{
		complaint: "Flu Symptoms",
		date: "30 Jan 2024",
		doctor: "Dr John Doe",
		color: "bg-yellow-50",
	},
	{
		complaint: "Cold & Cough",
		date: "30 Jan 2024",
		doctor: "Dr John Doe",
		color: "bg-purple-50",
	},
	{
		complaint: "Skin Allergy",
		date: "30 Jan 2024",
		doctor: "Dr John Doe",
		color: "bg-orange-50",
	},
	{
		complaint: "Pain in left ankle",
		date: "30 Jan 2024",
		doctor: "Dr John Doe",
		color: "bg-pink-50",
	},
	// Repeat for other consultations...
];

export default function ConsultationPage() {
	return (
		<div className="container mx-auto p-6">
			{/* Header */}
			<div className="mb-8">
				<Button variant="ghost" className="mb-4">
					<ArrowLeft className="mr-2 h-4 w-4" />
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
					<Tabs defaultValue="diagnosis" className="w-full">
						<TabsList>
							<TabsTrigger value="diagnosis">Diagnosis</TabsTrigger>
							<TabsTrigger value="vitals">Vitals</TabsTrigger>
							<TabsTrigger value="bmi">BMI</TabsTrigger>
							<TabsTrigger value="procedures">Procedures</TabsTrigger>
						</TabsList>
					</Tabs>
					<div className="flex gap-2 ml-4">
						<Button variant="outline">Patient Summary</Button>
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

			{/* Consultation Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
				{consultations.map((consultation, index) => (
					<div key={index} className={`rounded-lg p-4 ${consultation.color}`}>
						<div className="mb-2">
							<div className="text-sm text-gray-600">Chief Complaint :</div>
							<div className="font-medium">{consultation.complaint}</div>
						</div>
						<div className="flex justify-between text-sm text-gray-600">
							<span>{consultation.date}</span>
							<span>{consultation.doctor}</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
