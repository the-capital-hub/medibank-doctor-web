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
import { HeartPulse, Thermometer, Droplet } from "lucide-react";
import SPO2 from "../../../Images/spo2-icon.png";
import { useSelector } from "react-redux";

const VitalsCard = ({
	title,
	value,
	unit,
	status,
	trend,
	color,
	width = 100,
}) => {
	const patientDetails = useSelector((state) => state.patientDetails?.data);
	return (
	<>
		{title === "Body Temperature" && (
			<Card className={`w-[${width}px] h-auto shadow-lg`}>
				<CardHeader className="p-3">
					<CardTitle className="flex items-center">
						<div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center mr-3">
							<Thermometer className="w-6 h-6 text-orange-400" />
						</div>
						<span className="text-xs">Body Temperature</span>
					</CardTitle>
				</CardHeader>
				<CardContent className="p-3">
					<div className=" font-bold mb-2 text-xs text-gray-500">
						<span className="text-base text-black">{patientDetails?.data?.lastUpdatedVitals?.bodyTemp}</span> °F
					</div>
					<div className="text-gray-500 text-[12px]">Normal</div>
					<div className="mt-4 h-16">
						<Line
							data={{
								labels: ["", "", "", "", "", ""],
								datasets: [
									{
										fill: true,
										data: [
											
											patientDetails?.data?.lastUpdatedVitals?.bodyTemp - 3,
											patientDetails?.data?.lastUpdatedVitals?.bodyTemp - 2,
											patientDetails?.data?.lastUpdatedVitals?.bodyTemp - 1,
											patientDetails?.data?.lastUpdatedVitals?.bodyTemp,
											patientDetails?.data?.lastUpdatedVitals?.bodyTemp + 1,
											patientDetails?.data?.lastUpdatedVitals?.bodyTemp + 2,
											patientDetails?.data?.lastUpdatedVitals?.bodyTemp + 3,
										],
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
									y: { display: false, min: 97, max: 105},
								},
								elements: { point: { radius: 0 } },
							}}
						/>
					</div>
				</CardContent>
			</Card>
		)}
		{title === "Heart Rate" && (
			<Card className={`w-[${width}px] h-auto shadow-lg`}>
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
						<span className="text-base text-black">{patientDetails?.data?.lastUpdatedVitals?.heartRate}</span>
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
										data: [
											patientDetails?.data?.lastUpdatedVitals?.heartRate - 3,
											patientDetails?.data?.lastUpdatedVitals?.heartRate - 2,
											patientDetails?.data?.lastUpdatedVitals?.heartRate - 1,
											patientDetails?.data?.lastUpdatedVitals?.heartRate,
											patientDetails?.data?.lastUpdatedVitals?.heartRate + 1,
											patientDetails?.data?.lastUpdatedVitals?.heartRate + 2,
											patientDetails?.data?.lastUpdatedVitals?.heartRate + 3,
										],
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
									y: { display: false, min: 72, max: 120 },
								},
								elements: { point: { radius: 0 } },
							}}
						/>
					</div>
				</CardContent>
			</Card>
		)}
		{title === "Blood Pressure" && (
			<Card className={`w-[${width}px] h-auto shadow-lg`}>
				<CardHeader className="p-3">
					<CardTitle className="flex items-center">
						<div className="w-8 h-8 bg-teal-100 rounded flex items-center justify-center mr-3">
							<Droplet className="w-6 h-6 text-teal-400" />
						</div>
						<span className="text-xs">Blood Pressure</span>
					</CardTitle>
				</CardHeader>
				<CardContent className="p-3">
					<div className="text-gray-500 text-xs font-bold mb-2">
						<span className="text-base text-black">{patientDetails?.data?.lastUpdatedVitals?.bloodPres}</span> mmhg
					</div>
					<div className="text-gray-500 text-xs">Normal</div>
					<div className="mt-4 h-16">
						<Line
							data={{
								labels: ["", "", "", "", "", ""],
								datasets: [
									{
										fill: true,
										data: [
											patientDetails?.data?.lastUpdatedVitals?.bloodPres - 3,
											patientDetails?.data?.lastUpdatedVitals?.bloodPres - 2,
											patientDetails?.data?.lastUpdatedVitals?.bloodPres - 1,
											patientDetails?.data?.lastUpdatedVitals?.bloodPres,
											patientDetails?.data?.lastUpdatedVitals?.bloodPres + 1,
											patientDetails?.data?.lastUpdatedVitals?.bloodPres + 2,
											patientDetails?.data?.lastUpdatedVitals?.bloodPres + 3,
										],
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
									y: { display: false, min: 70, max: 150 },
								},
								elements: { point: { radius: 0 } },
							}}
						/>
					</div>
				</CardContent>
			</Card>
		)}
		{title === "SPO2" && (
			<Card className={`w-[${width}px] h-auto shadow-lg`}>
				<CardHeader className="p-3">
					<CardTitle className="flex items-center">
						<div className="w-8 h-8 bg-lime-100 rounded flex items-center justify-center mr-3">
							{/* <Droplet className="w-6 h-6 text-lime-400" /> */}
							<img src={SPO2} alt="" />
						</div>
						<span className="text-xs">SPO2</span>
					</CardTitle>
				</CardHeader>
				<CardContent className="p-3">
					<div className="text-gray-500 text-xs font-bold mb-2">
						{/* <span className="text-base text-black">102 </span>/ 72 mmhg */}
						<span className="text-base text-black">{patientDetails?.data?.lastUpdatedVitals?.spO2}</span> %
					</div>
					<div className="text-gray-500 text-xs">Normal</div>
					<div className="mt-4 h-16">
						<Line
							data={{
								labels: ["", "", "", "", "", ""],
								datasets: [
									{
										fill: true,
										data: [
											patientDetails?.data?.lastUpdatedVitals?.spO2 - 3,
											patientDetails?.data?.lastUpdatedVitals?.spO2 - 2,
											patientDetails?.data?.lastUpdatedVitals?.spO2 - 1,
											patientDetails?.data?.lastUpdatedVitals?.spO2,
											patientDetails?.data?.lastUpdatedVitals?.spO2 + 1,
											patientDetails?.data?.lastUpdatedVitals?.spO2 + 2,
											patientDetails?.data?.lastUpdatedVitals?.spO2 + 3,
										],
										// borderColor: "#2dd4bf",
										borderColor: "#4AB58E",
										// backgroundColor: "rgba(45, 212, 191, 0.1)",
										backgroundColor: "#b9e3d4",
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
									y: { display: false, min: 93, max: 100 },
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
};

export default VitalsCard;
