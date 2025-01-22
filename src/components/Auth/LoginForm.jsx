import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import GoogleLogo from "../../Images/Google.png";
import AppleLogo from "../../Images/AppleLogo.png";
import { ForgotPasswordPopup } from "./ForgotPasswordPopup";
import LanguageSelector from "../Popups/LanguageSearchPopup";

export function LoginForm() {
	const [showPassword, setShowPassword] = useState(false);
	const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
	const location = useLocation();
	const isAdmin = location.pathname.includes("/admin");
	const userType = isAdmin ? "Admin" : "Doctor";
	const baseRoute = isAdmin ? "/admin" : "/doctor";

	const [open, setOpen] = useState(false);

	const handleLanguageSelect = (language) => {
		console.log(`Selected language: ${language}`);
		// Handle language change here
	};

	return (
		<>
			<div className="p-8 bg-white rounded-lg w-full max-w-md">
				<div className="space-y-6">
					<div>
						<h2 className="text-2xl font-bold">Sign In</h2>
						{/* <p className="text-sm text-gray-600">{userType}s MLID#</p> */}
					</div>

					<div className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="email">{userType}&apos;s ID</Label>
							<Input
								id="email"
								placeholder="medibank123@gmail.com"
								type="email"
								required
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<div className="relative">
								<Input
									id="password"
									type={showPassword ? "text" : "password"}
									placeholder="Enter Password"
									required
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
									<span className="sr-only">
										{showPassword ? "Hide password" : "Show password"}
									</span>
								</Button>
							</div>
						</div>

						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-2">
								<Checkbox id="remember" />
								<label
									htmlFor="remember"
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									Remember me
								</label>
							</div>
							<Link
								onClick={() => setForgotPasswordOpen(true)}
								className="text-sm text-blue-600 hover:underline"
							>
								Forgot password?
							</Link>
						</div>

						<div className="my-3 mx-2 w-full">
							<div className="h-[1.75px] bg-gradient-to-r from-white via-black to-white w-full" />
						</div>

						<Button className="w-full bg-indigo-600 text-white" size="lg">
							Sign in
						</Button>

						{!isAdmin && (
							<div className="text-center text-sm">
								Don&apos;t have an account?{" "}
								<Link
									to={`${baseRoute}/signup`}
									className="text-blue-600 hover:underline"
								>
									Sign up
								</Link>
							</div>
						)}

						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-200" />
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="bg-white px-2 text-gray-500">
									Or continue with
								</span>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<Button variant="outline" className="w-full">
								<img src={GoogleLogo} alt="Google" className="w-5 h-5 mr-2" />
								Google
							</Button>
							<Button variant="outline" className="w-full">
								<img src={AppleLogo} alt="Apple" className="w-5 h-5 mr-2" />
								Apple
							</Button>
						</div>
						<Button onClick={() => setOpen(true)}>Change Language</Button>
						{/* <Button>Language</Button> */}
					</div>
				</div>
			</div>
			<ForgotPasswordPopup
				open={forgotPasswordOpen}
				onOpenChange={setForgotPasswordOpen}
			/>

			<LanguageSelector
				open={open}
				onOpenChange={setOpen}
				onLanguageSelect={handleLanguageSelect}
			/>
		</>
	);
}
