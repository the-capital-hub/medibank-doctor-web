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
import { Loader2 } from "lucide-react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const SEND_OTP = gql`
	mutation sendOtpForReset($EmailIdOrMobile: String!) {
		sendOtpForReset(EmailIdOrMobile: $EmailIdOrMobile) {
			status
			data
			message
		
		}
	}
`;

const VERIFY_OTP = gql`
	mutation verifyOtpAndUpdatePassword($EmailIdOrMobile: String!, $otp: String!, $newPassword: String!, $confirmPassword: String!) {
		verifyOtpAndUpdatePassword(EmailIdOrMobile: $EmailIdOrMobile, otp: $otp, newPassword: $newPassword, confirmPassword: $confirmPassword) {
			status
			data
			message
		}
	}`
export function ForgotPasswordPopup({ open, onOpenChange }) {
	const [verificationCode, setVerificationCode] = useState([
		"",
		"",
		"",
		"",
		"",
		"",
	]);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [otpSent, setOtpSent] = useState(false);
	const [formData, setFormData] = useState({
		EmailIdOrMobile: "",
		otp: "",
		newPassword: "",
		confirmPassword: ""
	});
	const [passwordsMatch, setPasswordsMatch] = useState(true);
	const navigate = useNavigate();
	const [sendOtp, { loading: loadingSendOtp, error: sendOtpError }] = useMutation(SEND_OTP, {
		onCompleted: (data) => {
			console.log("OTP send response:", data);
			if (data.sendOtpForReset && data.sendOtpForReset.status===true) {
				setOtpSent(true);
				toast.success(data.sendOtpForReset.message);
			}
		},
		onError: (error) => {
			console.log("OTP send error:", error);
		}
	});

	const [verifyOtp, { loading: loadingVerifyOtp, error: verifyOtpError }] = useMutation(VERIFY_OTP, {
		onCompleted: (data) => {
			if(data.verifyOtpAndUpdatePassword && data.verifyOtpAndUpdatePassword.status===true){
				onOpenChange(false);
				toast.success(data.verifyOtpAndUpdatePassword.message);
			}
			else{
				toast.error(data.verifyOtpAndUpdatePassword.message);
			}
		},
		onError: (error) => {
			console.log("OTP verify error:", error);
		}
	});
	const onSendOtp = async () => {
		if (!formData.EmailIdOrMobile) return;
		try {
			await sendOtp({ variables: { EmailIdOrMobile: formData.EmailIdOrMobile } });
		} catch (error) {
			console.error("Error sending OTP:", error);
		}
	};
	const verifyOtpAndUpdatePassword = async () => {
		if (!formData.EmailIdOrMobile || !formData.otp || !formData.newPassword || !formData.confirmPassword) {
			toast.error("Please fill all the fields");
			return;
		};
		try {
			await verifyOtp({ variables: formData });
		} catch (error) {
			console.error("Error verifying OTP:", error);
		}
	}
	const handleCodeChange = (index, value) => {
		if (value.length <= 1) {
			const newCode = [...verificationCode];
			newCode[index] = value;
			setVerificationCode(newCode);

			// Combine all digits to update the OTP in formData
			const fullOtp = newCode.join("");
			setFormData({ ...formData, otp: fullOtp });

			// Auto-focus next input
			if (value && index < 5) {  // Changed from 4 to 5 for 6 digits
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

	const handlePasswordChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value
		});
	};

	const handleConfirmPasswordChange = (e) => {
		const confirmValue = e.target.value;
		setFormData({
			...formData,
			confirmPassword: confirmValue
		});
		setPasswordsMatch(confirmValue === formData.newPassword);
	};

	const handleNewPasswordChange = (e) => {
		const newValue = e.target.value;
		setFormData({
			...formData,
			newPassword: newValue
		});
		setPasswordsMatch(newValue === formData.confirmPassword);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md bg-white">
				<DialogHeader>
					<DialogTitle className="text-2xl font-semibold">
						Forgot Password
					</DialogTitle>
				</DialogHeader>
				<div className="my-1 mx-2 w-full">
					<div className="h-[1.75px] bg-gradient-to-r from-white via-black to-white w-full" />
				</div>

				<div className="space-y-6">
					{/* Email Input and Send OTP Button */}
					<div className="flex gap-2">
						<Input
							type="text"
							name="EmailIdOrMobile"
							value={formData.EmailIdOrMobile}
							onChange={(e) => setFormData({ ...formData, EmailIdOrMobile: e.target.value })}
							placeholder="Enter your email or mobile number"
							className="flex-1"
							aria-label="EmailIdOrMobile"
							disabled={otpSent}
						/>
						<Button
							type="button"
							onClick={onSendOtp}
							className="bg-indigo-700 hover:bg-indigo-900 text-white"
							disabled={loadingSendOtp}
						>
							{loadingSendOtp ? <Loader2 className="animate-spin w-4 h-4" /> : "Send OTP"}
						</Button>
					</div>
					{sendOtpError && (
						<p className="text-red-500 text-sm">{sendOtpError.message}</p>
					)}

					{otpSent && (
						<>
							<div className="text-center">
								<p className="text-sm text-gray-600">
									Please enter the code we just sent to <span className="text-purple-500 font-semibold">{formData.EmailIdOrMobile}</span>
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
									<button 
										className="text-red-600 hover:underline"
										onClick={onSendOtp}
										disabled={loadingSendOtp}
									>
										{loadingSendOtp ? "Sending..." : "Resend code"}
									</button>
								</div>
							</div>

							<div className="space-y-4">
								<div className="space-y-2">
									<label className="text-sm font-medium">New Password</label>
									<div className="relative">
										<Input
											type={showPassword ? "text" : "password"}
											name="newPassword"
											value={formData.newPassword}
											onChange={handleNewPasswordChange}
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
											name="confirmPassword"
											value={formData.confirmPassword}
											onChange={handleConfirmPasswordChange}
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

								{!passwordsMatch && (
									<p className="text-red-500 text-sm">Passwords do not match</p>
								)}

								<Button onClick={verifyOtpAndUpdatePassword} className="w-full text-white  bg-indigo-800 hover:bg-indigo-900" size="lg" disabled={loadingVerifyOtp}>
									{loadingVerifyOtp ? <Loader2 className="animate-spin w-4 h-4" title="verifying OTP"/> : ""}
									{loadingVerifyOtp ? "verifying OTP" : "Verify OTP"}
								</Button>
							</div>
						</>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}