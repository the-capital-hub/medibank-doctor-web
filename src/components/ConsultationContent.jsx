import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Download } from "lucide-react";
import VitalsCard from "./VitalsCard";

function ConsultationContent({ selectedView, activeTab, consultation }) {
	const renderContent = () => {
		// Vitals Tab
		if (selectedView === "patientSummary" && activeTab === "vitals") {
			return (
				<div className="flex flex-col md:flex-row gap-6">
					<VitalsCard
						title="Blood Sugar"
						value="80"
						unit="mg/dL"
						status="Normal"
						trend="up"
						color="bg-orange-50"
					/>
					<VitalsCard
						title="Heart Rate"
						value="98"
						unit="bpm"
						status="Normal"
						trend="stable"
						color="bg-red-50"
					/>
					<VitalsCard
						title="Blood Pressure"
						value="102/72"
						unit="mmHg"
						status="Normal"
						trend="down"
						color="bg-blue-50"
					/>
				</div>
			);
		}

		// BMI Tab
		if (selectedView === "patientSummary" && activeTab === "bmi") {
			return (
				<div className="flex flex-col md:flex-row gap-8 items-start">
					<div className="relative w-2/4 h-96">
						<div className="absolute right-0 w-1/2 h-full flex items-center justify-center">
							<Avatar className="w-full h-full rounded-none">
								<AvatarImage
									src={`/src/Images/BMIBoyModel.png`}
									width={256}
									height={384}
									className="w-full h-full"
									alt="Body measurements"
								/>
								<AvatarFallback>N</AvatarFallback>
							</Avatar>
						</div>
						<div className="absolute left-0 top-0">
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
						</div>
					</div>
					<div className="space-y-4 w-1/3">
						<Card className="p-4">
							<div className="text-sm text-gray-600">Height</div>
							<div className="text-xl font-semibold">170 cm</div>
						</Card>
						<Card className="p-4">
							<div className="text-sm text-gray-600">Weight</div>
							<div className="text-xl font-semibold">72 kg</div>
						</Card>
						<Card className="p-6">
							<div className="text-sm text-gray-600 mb-2">
								Body Mass Index (BMI)
							</div>
							<div className="text-3xl font-semibold mb-4">24.9</div>
							<div className="h-2 bg-gradient-to-r from-green-300 via-yellow-300 to-red-300 rounded-full mb-2" />
							<div className="flex justify-between text-sm">
								<span>15</span>
								<span>18.5</span>
								<span>25</span>
								<span>30</span>
								<span>40</span>
							</div>
							<div className="mt-4 inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full">
								You&apos;re Healthy
							</div>
						</Card>
					</div>
				</div>
			);
		}

		// Reports Tab
		if (selectedView === "reports" && activeTab === "pastReports") {
			return (
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					{[1, 2, 3, 4].map((i) => (
						<Card key={i} className="p-4 md:max-w-[390px]">
							<div className="flex items-center gap-3">
								{/* <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
									<div className="w-6 h-6 bg-blue-500 rounded-full" />
								</div> */}
								<Avatar className="rounded-none w-14 h-14">
									<AvatarImage
										src={`/src/Images/report2.png`}
										width={256}
										height={384}
										// className="w-10 h-10 rounded-none"
										alt="Body measurements"
									/>
									<AvatarFallback>N</AvatarFallback>
								</Avatar>
								<div>
									<div className="font-medium">Blood Pressure Report</div>
									<div className="text-sm text-gray-600">
										Doctor: Sanjay Kumar
									</div>
								</div>
							</div>
							<div className="flex items-center justify-between">
								<div className="mt-2 text-sm text-gray-600">Oct 25, 2024</div>
								<button className="flex items-center gap-1 text-purple-600">
									<Download className="w-4 h-4" />
									<span className="text-sm">Download</span>
								</button>
							</div>
						</Card>
					))}
				</div>
			);
		}

		// Default consultation list for other tabs
		return (
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
				{consultation.map((item, index) => (
					<div key={index} className={`rounded-lg p-4 ${item.color}`}>
						<div className="mb-2">
							<div className="text-sm text-gray-600">Chief Complaint:</div>
							<div className="font-medium">{item.complaint}</div>
						</div>
						<div className="flex justify-between text-sm text-gray-600">
							<span>{item.date}</span>
							<span>{item.doctor}</span>
						</div>
					</div>
				))}
			</div>
		);
	};

	return renderContent();
}

export default ConsultationContent;
