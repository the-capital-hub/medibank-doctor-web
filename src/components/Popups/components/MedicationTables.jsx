export function MedicationTable() {
	const medications = [
		{
			name: "Combiflam",
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
			name: "Digene",
			dose: "",
			morning: 1,
			afternoon: 0,
			evening: 0,
			night: 1,
			duration: 5,
			quantity: 10,
			instructions: "After food",
		},
	];

	return (
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
					</tr>
				</thead>
				<tbody>
					{medications.map((med, index) => (
						<tr key={index} className="text-sm">
							<td className="border px-4 py-2">{med.name}</td>
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
							<td className="border px-4 py-2 text-center">{med.duration}</td>
							<td className="border px-4 py-2 text-center">{med.quantity}</td>
							<td className="border px-4 py-2">{med.instructions}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
