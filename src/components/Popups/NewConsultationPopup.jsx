import { useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { VitalsCard } from "./components/VitalsCard";

export default function DetailedConsultationDialog({ open, onOpenChange }) {
	const [formData, setFormData] = useState({
		complaint: "",
		note: "",
		diagnosticTests: [],
		doctorsNote: "",
	});

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[90dvw] rounded-3xl bg-white">
				<DialogHeader className="flex flex-row items-center justify-between border-b pb-4">
					<h2 className="text-xl font-semibold">
						New Consultation / Diagnosis
					</h2>
				</DialogHeader>

				<div className="flex justify-between gap-4 w-full">
					{/* Left Section */}
					<div className="space-y-6 w-[70%]">
						{/* Chief Complaint */}
						<div className="space-y-2">
							<label className="text-sm font-medium">Chief Complaint</label>
							<Input
								value={formData.complaint}
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										complaint: e.target.value,
									}))
								}
								placeholder="Complaint"
							/>
						</div>

						{/* Clinical Note */}
						<div className="space-y-2">
							<label className="text-sm font-medium">Clinical Note</label>
							<Textarea
								value={formData.note}
								onChange={(e) =>
									setFormData((prev) => ({ ...prev, note: e.target.value }))
								}
								placeholder="Patient reported fall in the bathroom few hours ago..."
								className="min-h-[100px]"
							/>
						</div>
						{/* Diagnostic Tests */}
						<div className="space-y-2">
							<label className="text-sm font-medium">Diagnostic Tests</label>
							{/* <div className="p-4 border rounded-lg"> */}
							<Input
								value={formData.diagnosticTests}
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										diagnosticTests: e.target.value,
									}))
								}
								placeholder="Diagnostic Tests"
							/>
							{/* </div> */}
						</div>

						{/* Doctor Notes */}
						<div className="space-y-2">
							<label className="text-sm font-medium">Doctor Notes</label>
							<Textarea
								value={formData.doctorsNote}
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										doctorsNote: e.target.value,
									}))
								}
								placeholder="Patient reported fall in the bathroom few hours ago..."
								className="min-h-[100px]"
							/>
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

						{/* Cancel and Save Button */}
						<div className="flex gap-4 w-full">
							<Button
								variant="outline"
								className="flex-1 text-base font-normal border border-red-500 text-red-500"
								onClick={() => onOpenChange(false)}
							>
								Cancel
							</Button>
							<Button
								className="flex-1 text-base font-normal bg-purple-600 hover:bg-purple-700"
								onClick={() => onOpenChange(false)}
							>
								Save
							</Button>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
