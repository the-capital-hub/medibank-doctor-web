import { useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { X } from "lucide-react";
import  VitalsCard  from "./components/VitalsCard";
import { MedicationTable } from "./components/MedicationTables";

export default function DetailedConsultationDialog({
	open,
	onOpenChange,
	consultation,
}) {
	const [formData, setFormData] = useState({
		complaint: "",
		note: "",
		diagnosticTests: ["X-ray - Ankle"],
	});
	if (!consultation) return null;
	// console.log(consultation);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[90dvw] rounded-3xl bg-white">
				<DialogHeader className="flex flex-row items-center justify-between border-b pb-4">
					<h2 className="text-xl font-semibold">
						{consultation?.doctor} - {consultation?.date}
					</h2>
				</DialogHeader>

				<div className="flex justify-between gap-4 w-full">
					{/* Left Section */}
					<div className="space-y-6 w-[70%]">
						{/* Chief Complaint */}
						<div className="space-y-2">
							<label className="text-sm font-medium">Chief Complaint</label>
							<div className="p-4 border rounded-lg">
								{consultation?.complaint}
							</div>
						</div>

						{/* Note */}
						<div className="space-y-2">
							<label className="text-sm font-medium">Note</label>
							<div className="p-4 border rounded-lg">
								{consultation?.note ||
									"Patient reported fall in the bathroom few hours ago. Complained of extreme pain in left ankle, visible swelling and restricted movement, no wound or bleeding. Prescribed meds for pain and suggested an X-ray."}
							</div>
						</div>

						{/* Medication Table */}
						<MedicationTable />

						{/* Diagnostic Tests */}
						<div className="space-y-2">
							<label className="text-sm font-medium">Diagnostic Tests</label>
							<div className="p-4 border rounded-lg">
								{formData.diagnosticTests.map((test, index) => (
									<div key={index} className="text-purple-600">
										{test}
									</div>
								))}
							</div>
						</div>
					</div>
					{/* Right Section */}
					<div className="flex flex-col gap-4 w-[30%]">
						{/* Vitals Section */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<VitalsCard
								title="Blood Sugar"
								value="80"
								unit="mg/dL"
								status="Normal"
								color="bg-orange-50"
							/>
							<VitalsCard
								title="Heart Rate"
								value="98"
								unit="bpm"
								status="Normal"
								color="bg-red-50"
							/>
							<VitalsCard
								title="Blood Pressure"
								value="102/72"
								unit="mmHg"
								status="Normal"
								color="bg-blue-50"
							/>
						</div>

						{/* Measurements */}
						<div className="grid grid-cols-2 gap-4">
							<div className="bg-orange-50 p-4 rounded-lg">
								<span className="block text-sm text-gray-600">Height</span>
								<span className="text-lg font-medium">170 cm</span>
							</div>
							<div className="bg-blue-50 p-4 rounded-lg">
								<span className="block text-sm text-gray-600">Weight</span>
								<span className="text-lg font-medium">72 kg</span>
							</div>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
