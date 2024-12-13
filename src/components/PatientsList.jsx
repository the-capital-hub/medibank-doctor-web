// import React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Eye, Pencil, Printer, Search } from "lucide-react";

const patients = [
	{
		id: 1,
		name: "Head Martin",
		gender: "Male",
		age: "38 years",
		startingDate: "August 8, 2023",
		medilogId: "MLG123658",
		priority: "Medium",
		location: "Hyderabad",
		avatar: "/placeholder.svg",
	},
	{
		id: 2,
		name: "Head Martin",
		gender: "Male",
		age: "38 years",
		startingDate: "August 8, 2023",
		medilogId: "MLG123658",
		priority: "High",
		location: "Hyderabad",
		avatar: "/placeholder.svg",
	},
	{
		id: 3,
		name: "Head Martin",
		gender: "Male",
		age: "38 years",
		startingDate: "August 8, 2023",
		medilogId: "MLG123658",
		priority: "Low",
		location: "Hyderabad",
		avatar: "/placeholder.svg",
	},
	{
		id: 4,
		name: "Head Martin",
		gender: "Male",
		age: "38 years",
		startingDate: "August 8, 2023",
		medilogId: "MLG123658",
		priority: "Medium",
		location: "Hyderabad",
		avatar: "/placeholder.svg",
	},
	{
		id: 5,
		name: "Head Martin",
		gender: "Male",
		age: "38 years",
		startingDate: "August 8, 2023",
		medilogId: "MLG123658",
		priority: "Low",
		location: "Hyderabad",
		avatar: "/placeholder.svg",
	},
];

const getPriorityColor = (priority) => {
	switch (priority.toLowerCase()) {
		case "high":
			return "bg-green-100 text-green-800";
		case "medium":
			return "bg-orange-100 text-orange-800";
		case "low":
			return "bg-yellow-100 text-yellow-800";
		default:
			return "bg-gray-100 text-gray-800";
	}
};

export default function PatientList() {
	return (
		<div className="container mx-auto p-6">
			<div className="flex flex-col space-y-6">
				{/* Header */}
				<div className="flex items-center justify-between">
					<h1 className="text-2xl font-semibold">List of Patients</h1>
					<Select defaultValue="oneWeek" className="bg-white">
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Select period" />
						</SelectTrigger>
						<SelectContent className="bg-white">
							<SelectItem value="oneWeek">One Week</SelectItem>
							<SelectItem value="twoWeeks">Two Weeks</SelectItem>
							<SelectItem value="oneMonth">One Month</SelectItem>
						</SelectContent>
					</Select>
				</div>

				{/* Controls */}
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<span className="text-sm">Show</span>
						<Select defaultValue="10">
							<SelectTrigger className="w-[70px]">
								<SelectValue placeholder="10" />
							</SelectTrigger>
							<SelectContent className="bg-white">
								<SelectItem value="10">10</SelectItem>
								<SelectItem value="20">20</SelectItem>
								<SelectItem value="50">50</SelectItem>
							</SelectContent>
						</Select>
						<span className="text-sm">Entries</span>
					</div>

					<div className="flex items-center space-x-4">
						<Button className="bg-purple-600 hover:bg-purple-700">
							Auto Approve
						</Button>
						<div className="relative">
							<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input placeholder="Search" className="pl-8 w-[250px]" />
						</div>
					</div>
				</div>

				{/* Table */}
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Starting Date</TableHead>
							<TableHead>Medilog ID</TableHead>
							<TableHead>Priority</TableHead>
							<TableHead>Location</TableHead>
							<TableHead>Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{patients.map((patient) => (
							<TableRow key={patient.id}>
								<TableCell>
									<div className="flex items-center space-x-3">
										<Avatar>
											<AvatarImage src={patient.avatar} alt={patient.name} />
											<AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
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
										className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
											patient.priority
										)}`}
									>
										{patient.priority}
									</span>
								</TableCell>
								<TableCell>{patient.location}</TableCell>
								<TableCell>
									<div className="flex items-center space-x-2">
										<Button variant="ghost" size="icon">
											<Eye className="h-4 w-4" />
										</Button>
										<Button variant="ghost" size="icon">
											<Pencil className="h-4 w-4" />
										</Button>
										<Button variant="ghost" size="icon">
											<Printer className="h-4 w-4" />
										</Button>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>

				{/* Pagination */}
				<div className="flex items-center justify-between">
					<div className="text-sm text-gray-500">
						Showing 2 to 10 of 30 entries
					</div>
					<div className="flex items-center space-x-2">
						<Button variant="outline" size="sm" disabled>
							Prev
						</Button>
						<Button
							variant="outline"
							size="sm"
							className="bg-purple-600 text-white"
						>
							1
						</Button>
						<Button variant="outline" size="sm">
							2
						</Button>
						<Button variant="outline" size="sm">
							3
						</Button>
						<Button variant="outline" size="sm">
							4
						</Button>
						<Button variant="outline" size="sm">
							5
						</Button>
						<Button variant="outline" size="sm">
							Next
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
