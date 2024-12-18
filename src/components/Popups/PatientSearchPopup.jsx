import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PatientSearchDialog({ open, onOpenChange }) {
	const [medilogId, setMedilogId] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle the form submission here
		console.log("Medilog ID submitted:", medilogId);
		onOpenChange(false);
		setMedilogId("");
	};

	const handleCancel = () => {
		onOpenChange(false);
		setMedilogId("");
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px] rounded-3xl bg-white">
				<DialogHeader className="flex flex-row items-center justify-between">
					<DialogTitle className="text-xl font-semibold">
						Consultation
					</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="space-y-2">
						<label className="text-sm font-medium">Medilog ID</label>
						<Input
							placeholder="M12345"
							value={medilogId}
							onChange={(e) => setMedilogId(e.target.value)}
							className="h-12"
						/>
					</div>
					<div className="flex gap-4">
						<Button
							type="button"
							variant="outline"
							className="flex-1 text-base font-normal border-2"
							onClick={handleCancel}
						>
							Cancel
						</Button>
						<Button
							type="submit"
							className="flex-1 text-base font-normal bg-purple-600 hover:bg-purple-700"
						>
							Continue
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
