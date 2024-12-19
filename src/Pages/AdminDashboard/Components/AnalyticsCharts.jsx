import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Bar,
	Line,
	BarChart,
	LineChart,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

const barChartData = [
	{ month: "May", doctors: 150, patients: 180 },
	{ month: "June", doctors: 180, patients: 200 },
	{ month: "July", doctors: 170, patients: 220 },
];

const areaChartData = [
	{ day: "M", value: 40 },
	{ day: "T", value: 30 },
	{ day: "W", value: 45 },
	{ day: "T", value: 35 },
	{ day: "F", value: 50 },
	{ day: "S", value: 35 },
	{ day: "S", value: 30 },
];

export function AnalyticsCharts() {
	return (
		<div className="grid gap-4 md:grid-cols-2">
			<Card>
				<CardHeader>
					<CardTitle>Doctors & Patients</CardTitle>
				</CardHeader>
				<CardContent>
					<ResponsiveContainer width="100%" height={300}>
						<BarChart data={barChartData}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="month" />
							<YAxis />
							<Tooltip />
							<Legend />
							<Bar dataKey="doctors" fill="#10B981" name="Doctors" />
							<Bar dataKey="patients" fill="#F59E0B" name="Patients" />
						</BarChart>
					</ResponsiveContainer>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between">
					<div>
						<CardTitle>Analytics</CardTitle>
						<div className="mt-4 space-y-2">
							<div className="flex items-center gap-2">
								<div className="text-4xl font-bold">12</div>
								<div className="flex items-center text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
									↑ 11% Strong
								</div>
							</div>
							<div className="text-sm text-gray-500">New Patients</div>
						</div>
					</div>
					<div>
						<div className="text-4xl font-bold">24</div>
						<div className="text-sm text-gray-500">New Subscribers</div>
					</div>
				</CardHeader>
				<CardContent>
					<ResponsiveContainer width="100%" height={200}>
						<LineChart data={areaChartData}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="day" />
							<YAxis />
							<Tooltip />
							<Line
								type="monotone"
								dataKey="value"
								stroke="#10B981"
								fill="#10B981"
								strokeWidth={2}
							/>
						</LineChart>
					</ResponsiveContainer>
				</CardContent>
			</Card>
		</div>
	);
}
