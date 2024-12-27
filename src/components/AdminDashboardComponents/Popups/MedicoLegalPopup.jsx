import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Search } from "lucide-react";

export default function MedicoLegalDialog({ open, onOpenChange }) {
	const [mlid, setMlid] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle the MLID search/submission here
		console.log("Searching for MLID:", mlid);
		onOpenChange(false);
		setMlid("");
	};

	const handleCancel = () => {
		onOpenChange(false);
		setMlid("");
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px] rounded-3xl bg-white">
				<DialogHeader className="flex flex-row items-center justify-between">
					<DialogTitle className="text-xl font-semibold">
						Medico Legal Interface
					</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="relative">
						<label className="text-sm font-medium mb-2 block">MBID</label>
						<div className="relative">
							<Input
								placeholder="Search MBID"
								value={mlid}
								onChange={(e) => setMlid(e.target.value)}
								className="pr-10"
							/>
							<Button
								type="button"
								variant="ghost"
								size="icon"
								className="absolute right-0 top-0 h-full w-10 hover:bg-transparent"
								onClick={() => console.log("Search clicked")}
							>
								<Search className="h-4 w-4 text-gray-400" />
							</Button>
						</div>
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
