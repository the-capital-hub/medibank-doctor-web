import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Eye, Edit2, Search } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const accessData = [
	{ id: "01", name: "Patient Summary", checked: true },
	{ id: "02", name: "Diagnosis", checked: true },
	{ id: "03", name: "Vitals & BMI", checked: true },
	{ id: "04", name: "Procedures", checked: true },
	{ id: "05", name: "Reports", checked: true },
];

export default function AccessManagementDialog({ open, onOpenChange }) {
	const [filters, setFilters] = useState({
		userId: "MLG345689",
		userName: "Karthik Kumar",
		userRole: "Doctor",
		selectAccess: "All",
	});

	const [entriesPerPage, setEntriesPerPage] = useState("10");
	const [searchQuery, setSearchQuery] = useState("");
	const [currentPage, setCurrentPage] = useState(1);

	const handleCheckboxChange = (id) => {
		// Handle checkbox changes here
		console.log("Checkbox changed for ID:", id);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[900px] rounded-3xl bg-white">
				<DialogHeader className="flex flex-row items-center justify-between">
					<DialogTitle className="text-xl font-semibold">
						Access Management
					</DialogTitle>
				</DialogHeader>

				{/* Filters */}
				<div className="grid grid-cols-4 gap-4">
					<Select
						value={filters.userId}
						onValueChange={(value) =>
							setFilters((prev) => ({ ...prev, userId: value }))
						}
					>
						<SelectTrigger>
							<SelectValue placeholder="User ID" />
						</SelectTrigger>
						<SelectContent className="bg-white">
							<SelectItem value="MLG345689">MLG345689</SelectItem>
						</SelectContent>
					</Select>

					<Select
						value={filters.userName}
						onValueChange={(value) =>
							setFilters((prev) => ({ ...prev, userName: value }))
						}
					>
						<SelectTrigger>
							<SelectValue placeholder="User Name" />
						</SelectTrigger>
						<SelectContent className="bg-white">
							<SelectItem value="Karthik Kumar">Karthik Kumar</SelectItem>
						</SelectContent>
					</Select>

					<Select
						value={filters.userRole}
						onValueChange={(value) =>
							setFilters((prev) => ({ ...prev, userRole: value }))
						}
					>
						<SelectTrigger>
							<SelectValue placeholder="User Role" />
						</SelectTrigger>
						<SelectContent className="bg-white">
							<SelectItem value="Doctor">Doctor</SelectItem>
						</SelectContent>
					</Select>

					<Select
						value={filters.selectAccess}
						onValueChange={(value) =>
							setFilters((prev) => ({ ...prev, selectAccess: value }))
						}
					>
						<SelectTrigger>
							<SelectValue placeholder="Select Access" />
						</SelectTrigger>
						<SelectContent className="bg-white">
							<SelectItem value="All">All</SelectItem>
						</SelectContent>
					</Select>
				</div>

				{/* Table Controls */}
				<div className="flex justify-between items-center">
					<div className="flex items-center gap-2">
						<span className="text-sm">Show</span>
						<Select value={entriesPerPage} onValueChange={setEntriesPerPage}>
							<SelectTrigger className="w-[70px]">
								<SelectValue placeholder="10" />
							</SelectTrigger>
							<SelectContent className="bg-white">
								<SelectItem value="10">10</SelectItem>
								<SelectItem value="25">25</SelectItem>
								<SelectItem value="50">50</SelectItem>
							</SelectContent>
						</Select>
						<span className="text-sm">Entries</span>
					</div>

					<div className="relative">
						<Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
						<Input
							placeholder="Search"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="pl-8"
						/>
					</div>
				</div>

				{/* Table */}
				<div className="border rounded-lg">
					<table className="w-full">
						<thead className="bg-yellow-50">
							<tr>
								<th className="px-4 py-3 text-left">S.No</th>
								<th className="px-4 py-3 text-left">Access Management</th>
								<th className="px-4 py-3 text-center">Action</th>
							</tr>
						</thead>
						<tbody>
							{accessData.map((item) => (
								<tr key={item.id} className="border-t">
									<td className="px-4 py-3">{item.id}</td>
									<td className="px-4 py-3">
										<div className="flex items-center gap-2">
											<Checkbox
												checked={item.checked}
												onCheckedChange={() => handleCheckboxChange(item.id)}
											/>
											<span>{item.name}</span>
										</div>
									</td>
									<td className="px-4 py-3">
										<div className="flex justify-center gap-2">
											<Button variant="ghost" size="icon" className="h-8 w-8">
												<Eye className="h-4 w-4" />
											</Button>
											<Button variant="ghost" size="icon" className="h-8 w-8">
												<Edit2 className="h-4 w-4" />
											</Button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{/* Pagination */}
				<div className="flex items-center justify-between">
					<div className="text-sm text-gray-500">
						Showing 1 to 5 of 50 entries
					</div>
					<div className="flex gap-1">
						<Button
							variant="outline"
							size="sm"
							disabled={currentPage === 1}
							onClick={() => setCurrentPage((prev) => prev - 1)}
						>
							Prev
						</Button>
						{[1, 2, 3, 4, 5].map((page) => (
							<Button
								key={page}
								variant={currentPage === page ? "default" : "outline"}
								size="sm"
								onClick={() => setCurrentPage(page)}
							>
								{page}
							</Button>
						))}
						<Button
							variant="outline"
							size="sm"
							onClick={() => setCurrentPage((prev) => prev + 1)}
						>
							Next
						</Button>
					</div>
				</div>

				{/* Add Access Button */}
				<div className="flex justify-center">
					<Button className="bg-purple-600 hover:bg-purple-700">
						Add Access
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
