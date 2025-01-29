// import React from "react"
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
import { Eye, Pencil, Printer, Search, ArrowLeft } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Link } from "react-router-dom";

const breadcrumbItems = [
	{ label: "Home", href: "/" },
	{ label: "Consultation", href: "/consultation" },
	{ label: "Payments", href: "/consultation/payments" },
];

const payments = [
	{
		invoiceNumber: "#IN0001",
		patientId: "MLG123456",
		patientName: "Kiran Kumar",
		totalAmount: "Rs : 900.00",
		status: "Paid",
	},
	{
		invoiceNumber: "#IN0001",
		patientId: "MLG123456",
		patientName: "Kiran Kumar",
		totalAmount: "Rs : 900.00",
		status: "Paid",
	},
	{
		invoiceNumber: "#IN0001",
		patientId: "MLG123456",
		patientName: "Kiran Kumar",
		totalAmount: "Rs : 900.00",
		status: "Paid",
	},
	{
		invoiceNumber: "#IN0001",
		patientId: "MLG123456",
		patientName: "Kiran Kumar",
		totalAmount: "Rs : 900.00",
		status: "Paid",
	},
	{
		invoiceNumber: "#IN0001",
		patientId: "MLG123456",
		patientName: "Kiran Kumar",
		totalAmount: "Rs : 900.00",
		status: "Paid",
	},
];

export default function PaymentReceipts() {
	return (
		<div className="container mx-auto p-6">
			<div className="flex flex-col space-y-3">
				{/* Header */}
				<div className="flex items-center mb-4">
					<Button variant="ghost" asChild>
						<Link to="/">
							<ArrowLeft className="mr-2 h-4 w-4" />
						</Link>
					</Button>
					<Breadcrumbs items={breadcrumbItems} />
				</div>
				<h1 className="text-2xl font-semibold">Payment Receipts</h1>

				{/* Time Period Filters */}
				<div className="flex items-center justify-between">
					<div className="text-lg">List of Patients</div>
					<div className="flex items-center gap-4">
						<div className="flex items-center space-x-2">
							<Button
								variant="ghost"
								className="hover:bg-blue-100 text-blue-600"
							>
								Today
							</Button>
							<Button variant="ghost">7d</Button>
							<Button variant="ghost">2w</Button>
							<Button variant="ghost">1m</Button>
							<Button variant="ghost">3m</Button>
							<Button variant="ghost">6m</Button>
							<Button variant="ghost">1y</Button>
						</div>
						<Select defaultValue="oneWeek">
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
							<TableHead>Invoice Number</TableHead>
							<TableHead>Patient ID</TableHead>
							<TableHead>Patient Name</TableHead>
							<TableHead>Total Amount</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{payments.map((payment, index) => (
							<TableRow key={index}>
								<TableCell>{payment.invoiceNumber}</TableCell>
								<TableCell>{payment.patientId}</TableCell>
								<TableCell>{payment.patientName}</TableCell>
								<TableCell>{payment.totalAmount}</TableCell>
								<TableCell>
									<span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
										{payment.status}
									</span>
								</TableCell>
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
