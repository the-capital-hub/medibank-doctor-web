import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { data } from "react-router-dom";

export default function MedicoLegalSMSDialog({ open, onOpenChange }) {
	const [formData, setFormData] = useState({
		director: "director1",
		message: "",
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Sending SMS:", formData);
		onOpenChange(false);
		setFormData({ director: "director1", message: "" });
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
					<RadioGroup
						value={formData.director}
						onValueChange={(value) =>
							setFormData((prev) => ({ ...prev, director: value }))
						}
						className="flex gap-4"
					>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="director1" id="director1" />
							<Label htmlFor="director1">Director 1</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem
								value="director2"
								id="director2"
								// className={({ "data-state": state }) =>
								// 	state === "checked" ? "bg-purple-700" : ""
								// }
							/>
							<Label htmlFor="director2">Director 2</Label>
						</div>
					</RadioGroup>

					<Textarea
						value={formData.message}
						onChange={(e) =>
							setFormData((prev) => ({ ...prev, message: e.target.value }))
						}
						className="min-h-[120px] resize-none"
					/>

					<div className="flex gap-4">
						<Button
							type="button"
							variant="outline"
							className="flex-1 text-base font-normal border-2"
							onClick={() => onOpenChange(false)}
						>
							Cancel
						</Button>
						<Button
							type="submit"
							className="flex-1 text-base font-normal bg-purple-600 hover:bg-purple-700"
						>
							Send SMS to Director
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
