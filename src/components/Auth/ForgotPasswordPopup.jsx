import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

export function ForgotPasswordPopup({ open, onOpenChange }) {
	const [verificationCode, setVerificationCode] = useState([
		"",
		"",
		"",
		"",
		"",
	]);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const handleCodeChange = (index, value) => {
		if (value.length <= 1) {
			const newCode = [...verificationCode];
			newCode[index] = value;
			setVerificationCode(newCode);

			// Auto-focus next input
			if (value && index < 4) {
				const nextInput = document.querySelector(`#code-${index + 1}`);
				nextInput?.focus();
			}
		}
	};

	const handleKeyDown = (index, e) => {
		if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
			const prevInput = document.querySelector(`#code-${index - 1}`);
			prevInput?.focus();
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md bg-white">
				<DialogHeader>
					<DialogTitle className="text-2xl font-bold">
						Forgot Password
					</DialogTitle>
				</DialogHeader>
				<div className="space-y-6">
					<div className="text-center">
						<p className="text-sm text-gray-600">
							Please enter the code we just sent to Email
						</p>
						<div className="flex justify-center gap-2 my-4">
							{verificationCode.map((digit, index) => (
								<Input
									key={index}
									id={`code-${index}`}
									type="text"
									inputMode="numeric"
									maxLength={1}
									value={digit}
									onChange={(e) => handleCodeChange(index, e.target.value)}
									onKeyDown={(e) => handleKeyDown(index, e)}
									className="w-12 h-12 text-center text-lg"
								/>
							))}
						</div>
						<div className="text-sm">
							Not received your code?{" "}
							<button className="text-red-600 hover:underline">
								Resend code
							</button>
						</div>
					</div>

					<div className="space-y-4">
						<div className="space-y-2">
							<label className="text-sm font-medium">New Password</label>
							<div className="relative">
								<Input
									type={showPassword ? "text" : "password"}
									placeholder="Enter Password"
								/>
								<Button
									type="button"
									variant="ghost"
									size="icon"
									className="absolute right-2 top-1/2 -translate-y-1/2"
									onClick={() => setShowPassword(!showPassword)}
								>
									{showPassword ? (
										<EyeOff className="h-4 w-4" />
									) : (
										<Eye className="h-4 w-4" />
									)}
								</Button>
							</div>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium">Confirm Password</label>
							<div className="relative">
								<Input
									type={showConfirmPassword ? "text" : "password"}
									placeholder="Enter Password"
								/>
								<Button
									type="button"
									variant="ghost"
									size="icon"
									className="absolute right-2 top-1/2 -translate-y-1/2"
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
								>
									{showConfirmPassword ? (
										<EyeOff className="h-4 w-4" />
									) : (
										<Eye className="h-4 w-4" />
									)}
								</Button>
							</div>
						</div>

						<Button className="w-full bg-indigo-600" size="lg">
							Create Password
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
