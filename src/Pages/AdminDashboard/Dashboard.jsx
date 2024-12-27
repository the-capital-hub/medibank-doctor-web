import { StatsCards } from "./Components/StatsCard";
import { AnalyticsCharts } from "./Components/AnalyticsCharts";
import { DoctorsTable } from "./Components/DoctorsTable";
import { PatientsTable } from "./Components/PatientsTable";

export default function AdminDashboard() {
	return (
		<div className="container mx-auto py-8 px-6 space-y-8  overflow-y-scroll custom-height hide-scrollbar">
			<div className="space-y-8">
				<StatsCards />
				<AnalyticsCharts />
				<DoctorsTable />
				<PatientsTable />
			</div>
		</div>
	);
}
