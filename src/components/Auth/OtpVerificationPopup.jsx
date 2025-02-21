import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { gql, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
const verifyOtp = gql`
	mutation VerifyAndRegisterUser($EmailID: String!, $emailOtp: String!, $mobile_num: String!, $mobileOtp: String!) {
		verifyAndRegisterUser(EmailID: $EmailID, emailOtp: $emailOtp, mobile_num: $mobile_num, mobileOtp: $mobileOtp) {
			status
			data
			message
		}
	}
`;

export default function OTPVerificationPopup({ isOpen, onClose, formData }) {
	
	const [mobileOTP, setMobileOTP] = useState("");
	const [emailOTP, setEmailOTP] = useState("");
	const [verifyAndRegisterUser, { loading }] = useMutation(verifyOtp,{
		onCompleted: (data) => {
			if (data && data.verifyAndRegisterUser) {
			  toast(data.verifyAndRegisterUser.message);
			  onClose();
			}
		}
	});

	const handleVerify = async (e) => {
		e.preventDefault();
		if (!mobileOTP || mobileOTP.length !== 6) {
			toast.error("Please enter a valid mobile OTP");
			return;
		}

		try {
			const result = await verifyAndRegisterUser({
				variables: {
					EmailID: formData.email,
					emailOtp: emailOTP,
					mobile_num: formData.mobileNumber,
					mobileOtp: mobileOTP
				}
			});

			if (result.data.verifyAndRegisterUser.status === "success") {
				
				// You might want to redirect here
			}
		} catch (error) {
			toast("Error verifying OTP: " + error.message);
			console.error("Mutation error:", error);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-md bg-white">
				<DialogHeader>
					<DialogTitle className="text-2xl font-bold">
						Enter verification code
					</DialogTitle>
					{/* <Button
						variant="ghost"
						size="icon"
						className="absolute right-4 top-4"
						onClick={onClose}
					>
						<X className="h-4 w-4" />
					</Button> */}
				</DialogHeader>
				<div className="space-y-6">
					<div className="space-y-2">
						<p className="text-sm text-muted-foreground">
							We have sent verification codes to:
						</p>
						<p className="font-medium">Mobile: {formData?.mobileNumber}</p>
						{formData?.email && (
							<p className="font-medium">Email: {formData?.email}</p>
						)}
					</div>

					<div className="space-y-4">
						<div className="space-y-2">
							<label className="text-sm font-medium">
								Enter Mobile OTP (Required)
							</label>
							<InputOTP
								maxLength={6}
								value={mobileOTP}
								onChange={(value) => setMobileOTP(value)}
							>
						    <InputOTPGroup>
                  {[...Array(6)].map((_, i) => (
                    <InputOTPSlot key={i} index={i} />
                  ))}
                </InputOTPGroup>
							</InputOTP>
							<div className="flex justify-between text-sm">
								<button
									type="button"
									className="text-green-600 hover:underline"
									onClick={() => console.log("Resend mobile OTP")}
								>
									Send the code again
								</button>
								<button
									type="button"
									className="text-blue-600 hover:underline"
									onClick={() => console.log("Change phone number")}
								>
									Change phone number
								</button>
							</div>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium">
								Enter Email OTP (Optional)
							</label>
							<InputOTP
								maxLength={6}
								value={emailOTP}
								onChange={(value) => setEmailOTP(value)}
							>
								 <InputOTPGroup>
                  {[...Array(6)].map((_, i) => (
                    <InputOTPSlot key={i} index={i} />
                  ))}
                </InputOTPGroup>
							</InputOTP>
							{formData?.email && (
								<div className="flex justify-between text-sm">
									<button
										type="button"
										className="text-green-600 hover:underline"
										onClick={() => console.log("Resend email OTP")}
									>
										Send the code again
									</button>
									<button
										type="button"
										className="text-blue-600 hover:underline"
										onClick={() => console.log("Change email")}
									>
										Change email
									</button>
								</div>
							)}
						</div>
					</div>

					<div className="flex justify-end">
						<Button
							className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
							onClick={handleVerify}
						>
							    {loading ? "Verifying OTP...": "Verify OTP"}

						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
