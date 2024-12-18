import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
	Legend,
} from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend
);
import { HeartPulse, Syringe, Droplet } from "lucide-react";

const VitalsCard = ({ title, value, unit, status, trend, color }) => (
	<>
		{title === "Blood Sugar" && (
			<Card className="max-w-[180px] h-auto">
				<CardHeader className="p-3">
					<CardTitle className="flex items-center">
						<div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center mr-3">
							<Syringe className="w-6 h-6 text-orange-400" />
						</div>
						<span className="text-xs">Blood Sugar</span>
					</CardTitle>
				</CardHeader>
				<CardContent className="p-3">
					<div className=" font-bold mb-2 text-xs text-gray-500">
						<span className="text-base text-black">80</span> mg/dL
					</div>
					<div className="text-gray-500 text-[12px]">Normal</div>
					<div className="mt-4 h-16">
						<Line
							data={{
								labels: ["", "", "", "", "", ""],
								datasets: [
									{
										fill: true,
										data: [65, 75, 70, 80, 75, 80],
										borderColor: "#fbbf24",
										backgroundColor: "rgba(251, 191, 36, 0.1)",
										tension: 0.4,
									},
								],
							}}
							options={{
								responsive: true,
								maintainAspectRatio: false,
								plugins: { legend: { display: false } },
								scales: {
									x: { display: false },
									y: { display: false, min: 60, max: 85 },
								},
								elements: { point: { radius: 0 } },
							}}
						/>
					</div>
				</CardContent>
			</Card>
		)}
		{title === "Heart Rate" && (
			<Card className="max-w-[180px] h-auto">
				<CardHeader className="p-3">
					<CardTitle className="flex items-center">
						<div className="w-8 h-8 bg-red-200 rounded flex items-center justify-center mr-3">
							<HeartPulse className="w-6 h-6 text-red-500" />
						</div>
						<span className="text-xs">Heart Rate</span>
					</CardTitle>
				</CardHeader>
				<CardContent className="p-3">
					<div className="font-bold mb-2 text-xs text-gray-500">
						<span className="text-base text-black">98 </span>
						bpm
					</div>
					<div className="text-gray-500 text-xs">Normal</div>
					<div className="mt-4 h-16">
						<Line
							data={{
								labels: ["", "", "", "", "", ""],
								datasets: [
									{
										fill: true,
										data: [90, 95, 92, 98, 96, 98],
										borderColor: "#ef4444",
										backgroundColor: "rgba(239, 68, 68, 0.1)",
										tension: 0.4,
									},
								],
							}}
							options={{
								responsive: true,
								maintainAspectRatio: false,
								plugins: { legend: { display: false } },
								scales: {
									x: { display: false },
									y: { display: false, min: 85, max: 100 },
								},
								elements: { point: { radius: 0 } },
							}}
						/>
					</div>
				</CardContent>
			</Card>
		)}
		{title === "Blood Pressure" && (
			<Card className="max-w-[110px] h-auto">
				<CardHeader className="p-3">
					<CardTitle className="flex items-center">
						<div className="w-8 h-8 bg-teal-100 rounded flex items-center justify-center mr-3">
							<Droplet className="w-6 h-6 text-teal-400" />
						</div>
						<span className="text-xs">Blood Sugar</span>
					</CardTitle>
				</CardHeader>
				<CardContent className="p-3">
					<div className="text-gray-500 text-xs font-bold mb-2">
						<span className="text-base text-black">102 </span>/ 72 mmhg
					</div>
					<div className="text-gray-500 text-xs">Normal</div>
					<div className="mt-4 h-16">
						<Line
							data={{
								labels: ["", "", "", "", "", ""],
								datasets: [
									{
										fill: true,
										data: [100, 105, 102, 108, 104, 102],
										borderColor: "#2dd4bf",
										backgroundColor: "rgba(45, 212, 191, 0.1)",
										tension: 0.4,
									},
								],
							}}
							options={{
								responsive: true,
								maintainAspectRatio: false,
								plugins: { legend: { display: false } },
								scales: {
									x: { display: false },
									y: { display: false, min: 95, max: 110 },
								},
								elements: { point: { radius: 0 } },
							}}
						/>
					</div>
				</CardContent>
			</Card>
		)}
	</>
);

export default VitalsCard;
