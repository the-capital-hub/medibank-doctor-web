import { Card, CardContent } from "@/components/ui/card";
import { Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
} from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler
);

export function VitalsCard({ title, value, unit, status, color }) {
	const chartData = {
		labels: ["", "", "", "", "", ""],
		datasets: [
			{
				fill: true,
				data: [65, 75, 70, 80, 75, 80],
				borderColor:
					title === "Blood Sugar"
						? "#f59e0b"
						: title === "Heart Rate"
						? "#ef4444"
						: "#06b6d4",
				backgroundColor: `${
					title === "Blood Sugar"
						? "#fef3c7"
						: title === "Heart Rate"
						? "#fee2e2"
						: "#cffafe"
				}33`,
				tension: 0.4,
			},
		],
	};

	const chartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: { legend: { display: false } },
		scales: {
			x: { display: false },
			y: { display: false },
		},
		elements: { point: { radius: 0 } },
	};

	return (
		<Card className={`${color}`}>
			<CardContent className="p-4">
				<div className="flex items-center gap-2 mb-2">
					<div
						className={`w-3 h-3 rounded-full ${
							title === "Blood Sugar"
								? "bg-orange-400"
								: title === "Heart Rate"
								? "bg-red-400"
								: "bg-blue-400"
						}`}
					/>
					<span className="text-sm text-gray-600">{title}</span>
				</div>
				<div className="flex items-baseline gap-1 mb-1">
					<span className="text-2xl font-semibold">{value}</span>
					<span className="text-sm text-gray-600">{unit}</span>
				</div>
				<div className="text-sm text-green-600 mb-2">{status}</div>
				<div className="h-16">
					<Line data={chartData} options={chartOptions} />
				</div>
			</CardContent>
		</Card>
	);
}
