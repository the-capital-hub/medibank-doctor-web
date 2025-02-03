import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, Upload } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export default function PushNotificationDialog({ open, onOpenChange }) {
	const [formData, setFormData] = useState({
		message: "",
		recipient: "",
		mlid: "",
		file: null,
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle the notification submission here
		console.log("Notification data:", formData);
		onOpenChange(false);
		setFormData({ message: "", recipient: "", mlid: "", file: null });
	};

	const handleCancel = () => {
		onOpenChange(false);
		setFormData({ message: "", recipient: "", mlid: "", file: null });
	};

	const handleFileUpload = (e) => {
		const file = e.target.files[0];
		if (file) {
			setFormData((prev) => ({ ...prev, file }));
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px] rounded-3xl bg-white">
				<DialogHeader className="flex flex-row items-center justify-between">
					<DialogTitle className="text-xl font-semibold">
						Push Notifications
					</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="space-y-2">
						<Textarea
							placeholder="Type Here"
							value={formData.message}
							onChange={(e) =>
								setFormData((prev) => ({ ...prev, message: e.target.value }))
							}
							className="min-h-[120px] resize-none"
						/>
					</div>

					<div className="space-y-4">
						<div>
							<label className="text-sm font-medium mb-2 block">
								Whom do you want to sent
							</label>
							<Select
								value={formData.recipient}
								onValueChange={(value) =>
									setFormData((prev) => ({ ...prev, recipient: value }))
								}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select" />
								</SelectTrigger>
								<SelectContent className="bg-white">
									<SelectItem value="all">To All</SelectItem>
									<SelectItem value="patients">Patients</SelectItem>
									<SelectItem value="doctors">Doctors</SelectItem>
									<SelectItem value="mlid">Specific MLID</SelectItem>
									<SelectItem value="expiring">Plan Expiring</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<Input
							placeholder="Enter MLID"
							value={formData.mlid}
							onChange={(e) =>
								setFormData((prev) => ({ ...prev, mlid: e.target.value }))
							}
						/>

						<div className="flex flex-col items-center justify-center  rounded-lg">
							{/* p-8 border-2 border-dashed bg-gray-50 */}
							<input
								type="file"
								id="file-upload"
								className="hidden"
								onChange={handleFileUpload}
							/>
							<label
								htmlFor="file-upload"
								className="cursor-pointer flex flex-col items-center gap-2"
							>
								<div className="p-3 rounded-full bg-purple-100">
									<Upload className="h-6 w-6 text-purple-600" />
								</div>
								{formData.file ? (
									<span className="text-sm text-gray-600">
										{formData.file.name}
									</span>
								) : null}
							</label>
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
							Send
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
