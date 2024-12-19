import { useState } from "react";
import { Eye, RotateCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DummyPic from "../../../Images/DummyPic.png";
const patients = [
	{
		id: 1,
		name: "Head Martin",
		age: "38 years",
		gender: "Male",
		startingDate: "August 8, 2023",
		medilogId: "MLG123658",
		planName: "Basic",
		location: "Hyderabad",
		status: "Active",
		avatar: `${DummyPic}`,
	},
	{
		id: 2,
		name: "Head Martin",
		age: "38 years",
		gender: "Male",
		startingDate: "August 8, 2023",
		medilogId: "MLG123658",
		planName: "Plus",
		location: "Hyderabad",
		status: "In Active",
		avatar: `${DummyPic}`,
	},
	{
		id: 3,
		name: "Head Martin",
		age: "38 years",
		gender: "Male",
		startingDate: "August 8, 2023",
		medilogId: "MLG123658",
		planName: "Premium",
		location: "Hyderabad",
		status: "Active",
		avatar: `${DummyPic}`,
	},
	{
		id: 4,
		name: "Head Martin",
		age: "38 years",
		gender: "Male",
		startingDate: "August 8, 2023",
		medilogId: "MLG123658",
		planName: "Basic",
		location: "Hyderabad",
		status: "In Active",
		avatar: `${DummyPic}`,
	},
	{
		id: 5,
		name: "Head Martin",
		age: "38 years",
		gender: "Male",
		startingDate: "August 8, 2023",
		medilogId: "MLG123658",
		planName: "Plus",
		location: "Hyderabad",
		status: "Active",
		avatar: `${DummyPic}`,
	},
];

export function PatientsTable() {
	const [selectedEntries, setSelectedEntries] = useState("10");
	const [searchQuery, setSearchQuery] = useState("");

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-bold">Patients</h2>
				<div className="flex items-center gap-2">
					<Select defaultValue="one-week">
						<SelectTrigger className="w-[120px]">
							<SelectValue placeholder="One Week" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="one-week">One Week</SelectItem>
							<SelectItem value="two-weeks">Two Weeks</SelectItem>
							<SelectItem value="one-month">One Month</SelectItem>
						</SelectContent>
					</Select>
					<Button
						variant="outline"
						className="bg-purple-500 hover:bg-purple-700 text-white"
					>
						Add Patients
					</Button>
				</div>
			</div>

			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<span>Show</span>
					<Select value={selectedEntries} onValueChange={setSelectedEntries}>
						<SelectTrigger className="w-[70px]">
							<SelectValue placeholder="10" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="10">10</SelectItem>
							<SelectItem value="20">20</SelectItem>
							<SelectItem value="50">50</SelectItem>
						</SelectContent>
					</Select>
					<span>Entries</span>
				</div>
				<div className="flex items-center gap-2">
					<Button
						variant="secondary"
						className="bg-purple-500 hover:bg-purple-700 text-white"
					>
						Auto Approve
					</Button>
					<Input
						placeholder="Search"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="w-64"
					/>
				</div>
			</div>

			<div className="border rounded-lg">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-12">
								<input type="checkbox" className="rounded" />
							</TableHead>
							<TableHead>Name</TableHead>
							<TableHead>Starting Date</TableHead>
							<TableHead>Medilog ID</TableHead>
							<TableHead>Plan Name</TableHead>
							<TableHead>Location</TableHead>
							<TableHead>Payment Status</TableHead>
							<TableHead>Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{patients.map((patient) => (
							<TableRow key={patient.id}>
								<TableCell>
									<input type="checkbox" className="rounded" />
								</TableCell>
								<TableCell>
									<div className="flex items-center gap-2">
										<Avatar>
											<AvatarImage src={patient.avatar} alt={patient.name} />
											<AvatarFallback>{patient.name[0]}</AvatarFallback>
										</Avatar>
										<div>
											<div className="font-medium">{patient.name}</div>
											<div className="text-sm text-gray-500">
												{patient.gender}, {patient.age}
											</div>
										</div>
									</div>
								</TableCell>
								<TableCell>{patient.startingDate}</TableCell>
								<TableCell>{patient.medilogId}</TableCell>
								<TableCell>
									<span
										className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
											patient.planName === "Basic"
												? "bg-blue-600 text-white"
												: "bg-blue-400 text-white"
										}`}
									>
										{patient.planName}
									</span>
								</TableCell>
								<TableCell>{patient.location}</TableCell>
								<TableCell>
									<span
										className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
											patient.status === "Active"
												? "bg-green-100 text-green-800"
												: "bg-red-100 text-red-800"
										}`}
									>
										{patient.status}
									</span>
								</TableCell>
								<TableCell>
									<div className="flex items-center gap-2">
										<Button variant="ghost" size="icon">
											<Eye className="h-4 w-4" />
										</Button>
										<Button variant="ghost" size="icon">
											<RotateCw className="h-4 w-4" />
										</Button>
										<Button variant="ghost" size="icon">
											<X className="h-4 w-4" />
										</Button>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			<div className="flex items-center justify-between">
				<div>Showing 1 to 5 of 30 entries</div>
				<div className="flex items-center gap-1">
					<Button variant="outline" disabled>
						Prev
					</Button>
					<Button variant="default">1</Button>
					<Button variant="outline">2</Button>
					<Button variant="outline">3</Button>
					<Button variant="outline">4</Button>
					<Button variant="outline">5</Button>
					<Button variant="outline">Next</Button>
				</div>
			</div>
		</div>
	);
}
