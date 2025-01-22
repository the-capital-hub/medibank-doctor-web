import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function Dashboard() {
	const navigate = useNavigate();
	return (
		<div className="bg-gray-50">
			{/* Main Content */}
			<main className="p-6">
				<div className="flex flex-col gap-6">
					{/* Welcome Section */}
					<div className="flex items-center justify-between">
						<h1 className="text-3xl font-bold tracking-tight">Good Morning</h1>
						{/* <div className="flex gap-4">
							<Button variant="outline">
								Get Your latest update for the last 7 days
							</Button>
						</div> */}
					</div>

					{/* Notifications */}
					<div className="space-y-4">
						<h2 className="text-lg font-semibold">Notifications</h2>
						<Card>
							<CardHeader className="flex flex-row items-center justify-between">
								<CardTitle className="text-base font-medium">
									Government promoting use of digital health records
								</CardTitle>
								<Button variant="ghost" size="sm">
									View
								</Button>
							</CardHeader>
						</Card>
					</div>

					{/* Last Activity */}
					<div className=" flex gap-5 items-center justify-center">
						<Card className="bg-indigo-800 text-white text-center w-1/3 cursor-pointer">
							<CardHeader>
								<CardTitle>Consultation</CardTitle>
							</CardHeader>
							{/* <CardContent>
							<p>No recent activity</p>
						</CardContent> */}
						</Card>
						<Card className="bg-indigo-800 text-white text-center w-1/3 cursor-pointer">
							<CardHeader>
								<CardTitle>Clinic Management</CardTitle>
							</CardHeader>
						</Card>

						<Card
							className="bg-indigo-800 text-white text-center w-1/3 cursor-pointer"
							onClick={() => {
								navigate("/admin/dashboard");
							}}
						>
							<CardHeader>
								<CardTitle>Admin Dashboard</CardTitle>
							</CardHeader>
						</Card>
						<Card
							className="bg-indigo-800 text-white text-center w-1/3 cursor-pointer"
							onClick={() => {
								navigate("/doctor/login");
							}}
						>
							<CardHeader>
								<CardTitle>Doctors login</CardTitle>
							</CardHeader>
						</Card>
						<Card
							className="bg-indigo-800 text-white text-center w-1/3 cursor-pointer"
							onClick={() => {
								navigate("/admin/login");
							}}
						>
							<CardHeader>
								<CardTitle>Admin login</CardTitle>
							</CardHeader>
						</Card>
					</div>
				</div>
			</main>
		</div>
	);
}

export default Dashboard;
