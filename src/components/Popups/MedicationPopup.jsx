import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Minus } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const medications = [
	"Combiflam",
	"Digene",
	"Paracetamol",
	"Aspirin",
	"Ibuprofen",
];

const instructions = [
	"After food",
	"Before food",
	"With warm water",
	"Empty stomach",
];

export default function MedicationDialog({ open, onOpenChange }) {
	const [formData, setFormData] = useState({
		medication: "",
		unit: "Dose",
		quantity: "",
		timing: {
			morning: false,
			afternoon: false,
			evening: false,
			night: false,
		},
		duration: "",
		instructions: "",
	});

	const [medicationList, setMedicationList] = useState([
		{
			medication: "Combiflam",
			dose: "400mg",
			morning: 1,
			afternoon: 1,
			evening: 0,
			night: 1,
			duration: 3,
			quantity: 9,
			instructions: "After food",
		},
		{
			medication: "Digene",
			dose: "",
			morning: 1,
			afternoon: 0,
			evening: 0,
			night: 1,
			duration: 5,
			quantity: 10,
			instructions: "After food",
		},
	]);

	const handleAdd = () => {
		const newMedication = {
			medication: formData.medication,
			dose:
				formData.unit === "Dose"
					? formData.quantity
					: `${formData.quantity}${formData.unit.toLowerCase()}`,
			morning: formData.timing.morning ? 1 : 0,
			afternoon: formData.timing.afternoon ? 1 : 0,
			evening: formData.timing.evening ? 1 : 0,
			night: formData.timing.night ? 1 : 0,
			duration: parseInt(formData.duration),
			quantity:
				parseInt(formData.quantity) *
				(formData.timing.morning +
					formData.timing.afternoon +
					formData.timing.evening +
					formData.timing.night) *
				parseInt(formData.duration),
			instructions: formData.instructions,
		};

		setMedicationList([...medicationList, newMedication]);

		// Reset form
		setFormData({
			medication: "",
			unit: "Dose",
			quantity: "",
			timing: {
				morning: false,
				afternoon: false,
				evening: false,
				night: false,
			},
			duration: "",
			instructions: "",
		});
	};

	const handleRemove = (index) => {
		setMedicationList(medicationList.filter((_, i) => i !== index));
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[80dvw] rounded-3xl bg-white">
				<DialogHeader className="flex flex-row items-center justify-between">
					<DialogTitle className="text-xl font-semibold">
						Medication
					</DialogTitle>
				</DialogHeader>

				<div className="space-y-6">
					{/* Medication Selection */}
					<Select
						value={formData.medication}
						onValueChange={(value) =>
							setFormData({ ...formData, medication: value })
						}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Dropdown list of all medications available in the market" />
						</SelectTrigger>
						<SelectContent className="bg-white">
							{medications.map((med) => (
								<SelectItem key={med} value={med}>
									{med}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					{/* Dose and Timing */}
					<div className="flex items-center gap-4">
						<RadioGroup
							value={formData.unit}
							onValueChange={(value) =>
								setFormData({ ...formData, unit: value })
							}
							className="flex items-center gap-4"
						>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="Dose" id="dose" />
								<label htmlFor="dose">Dose</label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="Mg" id="mg" />
								<label htmlFor="mg">Mg</label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="ML" id="ml" />
								<label htmlFor="ml">ML</label>
							</div>
						</RadioGroup>

						<Select
							value={formData.quantity}
							onValueChange={(value) =>
								setFormData({ ...formData, quantity: value })
							}
						>
							<SelectTrigger className="w-[120px]">
								<SelectValue placeholder="1 - 1000" />
							</SelectTrigger>
							<SelectContent className="bg-white">
								{Array.from({ length: 10 }, (_, i) => (i + 1) * 100).map(
									(num) => (
										<SelectItem key={num} value={num.toString()}>
											{num}
										</SelectItem>
									)
								)}
							</SelectContent>
						</Select>

						<div className="flex items-center gap-4">
							{["morning", "afternoon", "evening", "night"].map((time) => (
								<div key={time} className="flex items-center gap-2">
									<Checkbox
										id={time}
										checked={formData.timing[time]}
										onCheckedChange={(checked) =>
											setFormData({
												...formData,
												timing: { ...formData.timing, [time]: checked },
											})
										}
									/>
									<label htmlFor={time} className="capitalize">
										{time}
									</label>
								</div>
							))}
						</div>
					</div>

					{/* Duration and Instructions */}
					<div className="flex gap-4">
						<div className="flex-1">
							<label className="text-sm mb-2 block">Duration</label>
							<Select
								value={formData.duration}
								onValueChange={(value) =>
									setFormData({ ...formData, duration: value })
								}
							>
								<SelectTrigger>
									<SelectValue placeholder="1 - 14 days" />
								</SelectTrigger>
								<SelectContent className="bg-white max-h-40">
									{Array.from({ length: 14 }, (_, i) => i + 1).map((num) => (
										<SelectItem key={num} value={num.toString()}>
											{num} days
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div className="flex-1">
							<label className="text-sm mb-2 block">Instructions</label>
							<Select
								value={formData.instructions}
								onValueChange={(value) =>
									setFormData({ ...formData, instructions: value })
								}
							>
								<SelectTrigger>
									<SelectValue placeholder="Instructions" />
								</SelectTrigger>
								<SelectContent className="bg-white">
									{instructions.map((instruction) => (
										<SelectItem key={instruction} value={instruction}>
											{instruction}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<Button
							onClick={handleAdd}
							className="self-end bg-green-500 hover:bg-green-600"
						>
							+ Add
						</Button>
					</div>

					{/* Medications Table */}
					<div className="overflow-x-auto">
						<table className="w-full border-collapse">
							<thead>
								<tr className="text-sm text-gray-600">
									<th className="border px-4 py-2 text-left">Medication</th>
									<th className="border px-4 py-2 text-left">Dose</th>
									<th className="border px-4 py-2 text-center">Morning</th>
									<th className="border px-4 py-2 text-center">Afternoon</th>
									<th className="border px-4 py-2 text-center">Evening</th>
									<th className="border px-4 py-2 text-center">Night</th>
									<th className="border px-4 py-2 text-center">Duration</th>
									<th className="border px-4 py-2 text-center">Quantity</th>
									<th className="border px-4 py-2 text-left">Inst</th>
									<th className="border px-4 py-2 text-center">Action</th>
								</tr>
							</thead>
							<tbody>
								{medicationList.map((med, index) => (
									<tr key={index} className="text-sm">
										<td className="border px-4 py-2">{med.medication}</td>
										<td className="border px-4 py-2">{med.dose}</td>
										<td className="border px-4 py-2 text-center">
											{med.morning || "-"}
										</td>
										<td className="border px-4 py-2 text-center">
											{med.afternoon || "-"}
										</td>
										<td className="border px-4 py-2 text-center">
											{med.evening || "-"}
										</td>
										<td className="border px-4 py-2 text-center">
											{med.night || "-"}
										</td>
										<td className="border px-4 py-2 text-center">
											{med.duration}
										</td>
										<td className="border px-4 py-2 text-center">
											{med.quantity}
										</td>
										<td className="border px-4 py-2">{med.instructions}</td>
										<td className="border px-4 py-2">
											<Button
												variant="ghost"
												size="icon"
												onClick={() => handleRemove(index)}
												className="h-6 w-6 rounded-full bg-red-100 hover:bg-red-200"
											>
												<Minus className="h-4 w-4 text-red-600" />
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
