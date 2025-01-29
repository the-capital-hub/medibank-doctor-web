import { useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X, FileSpreadsheet, Plus } from "lucide-react";

export default function DetailedConsultationDialog({ open, onOpenChange }) {
	const [formData, setFormData] = useState({
		complaint: "",
		note: "",
		diagnosticTests: [],
		diagnosticInput: "",
		medications: [
			{
				name: "Combifram",
				dose: "400mg",
				morning: "1",
				afternoon: "",
				evening: "",
				night: "1",
				duration: "3",
				quantity: "9",
				instructions: "After food",
			},
		],
	});

	const handleMedicationChange = (index, field, value) => {
		setFormData((prev) => ({
			...prev,
			medications: prev.medications.map((med, i) =>
				i === index ? { ...med, [field]: value } : med
			),
		}));
	};

	const addNewMedication = () => {
		setFormData((prev) => ({
			...prev,
			medications: [
				...prev.medications,
				{
					name: "",
					dose: "",
					morning: "",
					afternoon: "",
					evening: "",
					night: "",
					duration: "",
					quantity: "",
					instructions: "",
				},
			],
		}));
	};

	const addDiagnosticTest = () => {
		if (
			formData.diagnosticInput &&
			!formData.diagnosticTests.includes(formData.diagnosticInput)
		) {
			setFormData((prev) => ({
				...prev,
				diagnosticTests: [...prev.diagnosticTests, prev.diagnosticInput],
				diagnosticInput: "",
			}));
		}
	};

	const removeDiagnosticTest = (testToRemove) => {
		setFormData((prev) => ({
			...prev,
			diagnosticTests: prev.diagnosticTests.filter(
				(test) => test !== testToRemove
			),
		}));
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[95dvw] rounded-3xl bg-white">
				<DialogHeader className="flex flex-row items-center justify-between border-b pb-4">
					<div className="flex items-center justify-between w-full">
						<h2 className="text-xl">Dr John Doe - 30 May 2024</h2>
					</div>
				</DialogHeader>

				<div className="flex justify-between gap-6 w-full">
					{/* Left Section */}
					<div className="space-y-6 w-[70%]">
						{/* Chief Complaint */}
						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-600">
								Chief Complaint
							</label>
							<Input
								value={formData.complaint}
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										complaint: e.target.value,
									}))
								}
								placeholder="Complaint"
								className="border-gray-200"
							/>
						</div>

						{/* Clinical Notes */}
						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-600">
								Clinical Notes
							</label>
							<Textarea
								value={formData.note}
								onChange={(e) =>
									setFormData((prev) => ({ ...prev, note: e.target.value }))
								}
								placeholder="Patient reported fall in the bathroom few hours ago. Complained of extreme pain in left ankle, visible swelling and restricted movement, no wound or bleeding. Prescribed meds and suggested an X-ray"
								className="min-h-[100px] border-gray-200"
							/>
						</div>

						{/* Medications Table */}
						<div className="space-y-2">
							<div className="flex justify-between items-center">
								<label className="text-sm font-medium text-gray-600">
									Medication
								</label>
								<Button
									variant="ghost"
									size="sm"
									onClick={addNewMedication}
									className="text-blue-500 hover:text-blue-600"
								>
									<Plus className="h-4 w-4 mr-1" />
									Add Medication
								</Button>
							</div>
							<div className="border rounded-lg overflow-x-auto">
								<table className="w-full text-sm">
									<thead className="bg-gray-50 border-b">
										<tr>
											<th className="px-4 py-2 text-left">Medication</th>
											<th className="px-4 py-2 text-left">Dose</th>
											<th className="px-4 py-2 text-left">Morning</th>
											<th className="px-4 py-2 text-left">Afternoon</th>
											<th className="px-4 py-2 text-left">Evening</th>
											<th className="px-4 py-2 text-left">Night</th>
											<th className="px-4 py-2 text-left">Duration</th>
											<th className="px-4 py-2 text-left">Quantity</th>
											<th className="px-4 py-2 text-left">Inst</th>
										</tr>
									</thead>
									<tbody>
										{formData.medications.map((med, index) => (
											<tr key={index} className="border-b">
												<td className="px-4 py-2">
													<Input
														value={med.name}
														onChange={(e) =>
															handleMedicationChange(
																index,
																"name",
																e.target.value
															)
														}
														placeholder="Medicine"
														className="border-0 bg-transparent p-0 h-8"
													/>
												</td>
												<td className="px-4 py-2">
													<Input
														value={med.dose}
														onChange={(e) =>
															handleMedicationChange(
																index,
																"dose",
																e.target.value
															)
														}
														placeholder="Dose"
														className="border-0 bg-transparent p-0 h-8"
													/>
												</td>
												<td className="px-4 py-2">
													<Input
														value={med.morning}
														onChange={(e) =>
															handleMedicationChange(
																index,
																"morning",
																e.target.value
															)
														}
														placeholder="Morning"
														className="border-0 bg-transparent p-0 h-8"
													/>
												</td>
												<td className="px-4 py-2">
													<Input
														value={med.afternoon}
														onChange={(e) =>
															handleMedicationChange(
																index,
																"afternoon",
																e.target.value
															)
														}
														placeholder="Afternoon"
														className="border-0 bg-transparent p-0 h-8"
													/>
												</td>
												<td className="px-4 py-2">
													<Input
														value={med.evening}
														onChange={(e) =>
															handleMedicationChange(
																index,
																"evening",
																e.target.value
															)
														}
														placeholder="Evening"
														className="border-0 bg-transparent p-0 h-8"
													/>
												</td>
												<td className="px-4 py-2">
													<Input
														value={med.night}
														onChange={(e) =>
															handleMedicationChange(
																index,
																"night",
																e.target.value
															)
														}
														placeholder="Night"
														className="border-0 bg-transparent p-0 h-8"
													/>
												</td>
												<td className="px-4 py-2">
													<Input
														value={med.duration}
														onChange={(e) =>
															handleMedicationChange(
																index,
																"duration",
																e.target.value
															)
														}
														placeholder="Duration"
														className="border-0 bg-transparent p-0 h-8"
													/>
												</td>
												<td className="px-4 py-2">
													<Input
														value={med.quantity}
														onChange={(e) =>
															handleMedicationChange(
																index,
																"quantity",
																e.target.value
															)
														}
														placeholder="Quantity"
														className="border-0 bg-transparent p-0 h-8"
													/>
												</td>
												<td className="px-4 py-2">
													<Input
														value={med.instructions}
														onChange={(e) =>
															handleMedicationChange(
																index,
																"instructions",
																e.target.value
															)
														}
														placeholder="Instructions"
														className="border-0 bg-transparent p-0 h-8"
													/>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>

						{/* Diagnostic Tests */}
						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-600">
								Diagnostic Tests
							</label>
							<div className="flex items-center gap-2">
								<Input
									value={formData.diagnosticInput || ""}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											diagnosticInput: e.target.value,
										}))
									}
									placeholder="Enter diagnostic test"
									className="border-gray-200 flex-grow"
								/>
								<Button
									type="button"
									onClick={addDiagnosticTest}
									className="p-2"
									variant="outline"
								>
									<Plus className="h-4 w-4" />
								</Button>
							</div>
						</div>
					</div>

					{/* Right Section */}
					<div className="w-[30%] space-y-4">
						<div className="space-y-2 border rounded-xl p-4 bg-gray-50">
							<div className="grid">
								<div className="flex justify-between items-center p-2 rounded-lg">
									<span className="text-green-600">Body Temp :</span>
									<span className="text-blue-500 font-medium">99.4 F</span>
								</div>
								<div className="flex justify-between items-center p-2 rounded-lg">
									<span className="text-green-600">Heart Rate :</span>
									<span className="text-blue-500 font-medium">72 BPM</span>
								</div>
								<div className="flex justify-between items-center p-2 rounded-lg">
									<span className="text-green-600">Resp Rate :</span>
									<span className="text-blue-500 font-medium">14 bpm</span>
								</div>
								<div className="flex justify-between items-center p-2 rounded-lg">
									<span className="text-green-600">Blood Pres :</span>
									<span className="text-blue-500 font-medium">100/70</span>
								</div>
								<div className="flex justify-between items-center p-2 rounded-lg">
									<span className="text-green-600">SpO2 :</span>
									<span className="text-blue-500 font-medium">98%</span>
								</div>
							</div>
						</div>

						<div className="flex gap-4 items-center p-3 border rounded-xl">
							<span className="text-green-600">Weight :</span>
							<span className="text-black font-medium">72 kg</span>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-600">
								Diagnostic Tests
							</label>
							<div className="flex gap-2 flex-wrap">
								{formData.diagnosticTests.map((test, index) => (
									<div
										key={index}
										className="w-max flex items-center gap-3 bg-red-100 p-2 rounded-lg text-gray-600"
									>
										<div className="flex items-center gap-2">
											<FileSpreadsheet className="w-5 h-5" />
											<span>{test}</span>
										</div>
										<Button
											type="button"
											onClick={() => removeDiagnosticTest(test)}
											className="p-1 h-auto"
											variant="ghost"
										>
											<X className="h-4 w-4" />
										</Button>
									</div>
								))}
							</div>
						</div>

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
