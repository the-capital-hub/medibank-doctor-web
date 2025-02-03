import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function RequestToAdminPopup({ open, onOpenChange, onSubmit }) {
	const [message, setMessage] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		// Trim the message and check if it's not empty
		const trimmedMessage = message.trim();
		if (trimmedMessage) {
			// Call the onSubmit prop with the message if provided
			if (onSubmit) {
				onSubmit({
					message: trimmedMessage,
					timestamp: new Date(),
				});
			} else {
				// Fallback if no onSubmit is provided
				console.log("Message submitted:", trimmedMessage);
			}

			// Reset the dialog
			onOpenChange(false);
			setMessage("");
		}
	};

	const handleCancel = () => {
		onOpenChange(false);
		setMessage("");
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px] rounded-3xl bg-white">
				<DialogHeader className="flex flex-row items-center justify-between">
					<DialogTitle className="text-xl font-semibold">
						Admin / Support
					</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="space-y-2">
						<label className="text-sm font-medium">Message</label>
						<Textarea
							placeholder="Type here"
							className="min-h-[120px] resize-none"
							value={message}
							onChange={(e) => setMessage(e.target.value)}
						/>
					</div>
					<div className="flex gap-4">
						<Button
							type="button"
							variant="outline"
							className="flex-1 text-base font-normal border border-red-600 text-red-600 hover:text-red-700"
							onClick={handleCancel}
						>
							Cancel
						</Button>
						<Button
							type="submit"
							className="flex-1 text-base font-normal bg-purple-600 hover:bg-purple-700"
							disabled={!message.trim()}
						>
							Send
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
