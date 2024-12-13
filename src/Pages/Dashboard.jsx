import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function Dashboard() {
	return (
		<div className="bg-gray-50">
			{/* Main Content */}
			<main className="p-6">
				<div className="flex flex-col gap-6">
					{/* Welcome Section */}
					<div className="flex items-center justify-between">
						<h1 className="text-3xl font-bold tracking-tight">Good Morning</h1>
						<div className="flex gap-4">
							<Button variant="outline">
								Get Your latest update for the last 7 days
							</Button>
						</div>
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
					<Card className="bg-indigo-800 text-white text-center w-1/2 mx-auto">
						<CardHeader>
							<CardTitle>Your Last Activity</CardTitle>
						</CardHeader>
						{/* <CardContent>
                <p>No recent activity</p>
              </CardContent> */}
					</Card>
				</div>
			</main>
		</div>
	);
}

export default Dashboard;
