import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ChevronDown, Plus } from "lucide-react";

export default function DiagnosticTestsDialog({ open, onOpenChange }) {
	const [selectedTest, setSelectedTest] = useState("");

	// Sample tests data - replace with your actual data
	const diagnosticTests = [
		"Complete Blood Count",
		"Blood Sugar Test",
		"Lipid Profile",
		"Liver Function Test",
		"Kidney Function Test",
	];

	const handleAdd = () => {
		if (selectedTest) {
			console.log("Test added:", selectedTest);
			setSelectedTest("");
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px] rounded-3xl bg-white">
				<DialogHeader className="flex flex-row items-center justify-between">
					<DialogTitle className="text-xl font-semibold">
						Diagnostics Tests
					</DialogTitle>
				</DialogHeader>
				<div className="space-y-4">
					<Select value={selectedTest} onValueChange={setSelectedTest}>
						<SelectTrigger className="w-full h-12">
							<SelectValue placeholder="Dropdown list of all medications available in the market" />
						</SelectTrigger>
						<SelectContent className="bg-white">
							{diagnosticTests.map((test) => (
								<SelectItem key={test} value={test} className="cursor-pointer hover:bg-green-200">
									{test}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<div className="flex justify-center">
						<Button
							onClick={handleAdd}
							className="bg-green-500 hover:bg-green-600 text-white gap-2"
						>
							<Plus className="h-4 w-4" /> Add
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
