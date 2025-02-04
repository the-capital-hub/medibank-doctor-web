import { useState } from "react";
import { Users, UserCircle, FileUser, SquareUserRound, ArrowUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import AccessManagementPopup from "../../../components/AdminDashboardComponents/Popups/AccessManagementPopup";

export function StatsCards() {
	const [showAccessManagementPopup, setShowAccessManagementPopup] =
		useState(false);
	return (
		<>
			<div className="flex flex-col gap-6">
				<div className="flex items-center justify-between">
					<h2 className="text-2xl font-bold">Doctors & Patients</h2>
					<div className="flex items-center gap-2">
						<Select defaultValue="one-week">
							<SelectTrigger className="w-[120px]">
								<SelectValue placeholder="One Week" />
							</SelectTrigger>
							<SelectContent className="bg-white">
								<SelectItem value="one-week">One Week</SelectItem>
								<SelectItem value="two-weeks">Two Weeks</SelectItem>
								<SelectItem value="one-month">One Month</SelectItem>
							</SelectContent>
						</Select>
						<Button
							variant="outline"
							className="bg-purple-500 hover:bg-purple-700 text-white"
						>
							Export
						</Button>
						<Button
							variant="outline"
							className="bg-purple-500 hover:bg-purple-700 text-white"
							onClick={() => setShowAccessManagementPopup(true)}
						>
							Access Management
						</Button>
					</div>
				</div>
				<div className="flex gap-4">
					<Card className="p-6 bg-emerald-50">
						<div className="flex items-center gap-4">
							<div className="p-2 bg-emerald-100 rounded-full">
								<UserCircle className="w-6 h-6 text-emerald-500" />
							</div>
							<div>
								<h3 className="text-4xl font-bold text-emerald-500">2000+</h3>
								<p className="text-sm text-emerald-600">Doctors</p>
								<button className="text-sm text-emerald-600 hover:underline mt-1">
									View all
								</button>
							</div>
						</div>
					</Card>

					<Card className="p-6 bg-amber-50">
						<div className="flex items-center gap-4">
							<div className="p-2 bg-amber-100 rounded-full">
								<Users className="w-6 h-6 text-amber-500" />
							</div>
							<div>
								<h3 className="text-4xl font-bold text-amber-500">1500+</h3>
								<p className="text-sm text-amber-600">Patients</p>
								<button className="text-sm text-amber-600 hover:underline mt-1">
									View all
								</button>
							</div>
						</div>
					</Card>
				</div>

				<div className="flex gap-4">
					<Card className="flex items-center gap-4 border border-indigo-700 p-3 rounded-lg">
						<SquareUserRound className="w-6 h-6 text-indigo-700" />
						<div className="text-indigo-600">
							Number of facilities linking these records :{" "}
							<span className="font-bold">1500k</span>
						</div>
						<ArrowUp className="w-6 h-6 text-green-700" />
					</Card>

					<div className="flex items-center gap-4 border border-indigo-700 p-3 rounded-lg">
						<SquareUserRound className="w-6 h-6 text-indigo-700" />
						<div className="text-indigo-600">
							Number of ABHA linked transactions :{" "}
							<span className="font-bold">1500k</span>
						</div>
						<ArrowUp className="w-6 h-6 text-green-700" />
					</div>
				</div>
			</div>
			<AccessManagementPopup
				open={showAccessManagementPopup}
				onOpenChange={setShowAccessManagementPopup}
			/>
		</>
	);
}
