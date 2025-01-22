import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Eye, EyeOff, Upload, UserRound, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export function SignupForm() {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [imagePreview, setImagePreview] = useState(null);
	const [qualifications, setQualifications] = useState([
		{
			id: 1,
			qualification: "",
			college: "",
			year: "",
			city: "",
			state: "",
		},
	]);

	const location = useLocation();
	const isAdmin = location.pathname.includes("/admin");
	const baseRoute = isAdmin ? "/admin" : "/doctor";

	const handleImageUpload = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleQualificationChange = (id, field, value) => {
		setQualifications((prev) =>
			prev.map((qual) => (qual.id === id ? { ...qual, [field]: value } : qual))
		);
	};

	const addQualification = () => {
		setQualifications((prev) => [
			...prev,
			{
				id: Date.now(),
				qualification: "",
				college: "",
				year: "",
				city: "",
				state: "",
			},
		]);
	};

	const removeQualification = (id) => {
		if (qualifications.length > 1) {
			setQualifications((prev) => prev.filter((qual) => qual.id !== id));
		}
	};

	const QualificationFields = ({ qualification, showRemove }) => (
		<div className="space-y-4 p-4 border rounded-lg relative">
			{showRemove && (
				<Button
					type="button"
					variant="ghost"
					size="icon"
					className="absolute right-2 top-2"
					onClick={() => removeQualification(qualification.id)}
				>
					<X className="h-4 w-4" />
				</Button>
			)}

			<div className="space-y-2">
				<Label htmlFor={`qualifications-${qualification.id}`}>
					Qualifications
				</Label>
				<Input
					id={`qualifications-${qualification.id}`}
					placeholder="Enter Qualifications"
					value={qualification.qualification}
					onChange={(e) =>
						handleQualificationChange(
							qualification.id,
							"qualification",
							e.target.value
						)
					}
					required
				/>
			</div>

			<div className="grid grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label htmlFor={`college-${qualification.id}`}>
						Medical College Name
					</Label>
					<Select
						value={qualification.college}
						onValueChange={(value) =>
							handleQualificationChange(qualification.id, "college", value)
						}
					>
						<SelectTrigger id={`college-${qualification.id}`}>
							<SelectValue placeholder="Select" />
						</SelectTrigger>
						<SelectContent className="bg-white">
							<SelectItem value="college1">College 1</SelectItem>
							<SelectItem value="college2">College 2</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div className="space-y-2">
					<Label htmlFor={`year-${qualification.id}`}>Course Year</Label>
					<Select
						value={qualification.year}
						onValueChange={(value) =>
							handleQualificationChange(qualification.id, "year", value)
						}
					>
						<SelectTrigger id={`year-${qualification.id}`}>
							<SelectValue placeholder="Select" />
						</SelectTrigger>
						<SelectContent className="bg-white">
							<SelectItem value="2020">2020</SelectItem>
							<SelectItem value="2021">2021</SelectItem>
							<SelectItem value="2022">2022</SelectItem>
							<SelectItem value="2023">2023</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label htmlFor={`city-${qualification.id}`}>City/Town</Label>
					<Select
						value={qualification.city}
						onValueChange={(value) =>
							handleQualificationChange(qualification.id, "city", value)
						}
					>
						<SelectTrigger id={`city-${qualification.id}`}>
							<SelectValue placeholder="Select" />
						</SelectTrigger>
						<SelectContent className="bg-white">
							<SelectItem value="city1">City 1</SelectItem>
							<SelectItem value="city2">City 2</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div className="space-y-2">
					<Label htmlFor={`state-${qualification.id}`}>State</Label>
					<Select
						value={qualification.state}
						onValueChange={(value) =>
							handleQualificationChange(qualification.id, "state", value)
						}
					>
						<SelectTrigger id={`state-${qualification.id}`}>
							<SelectValue placeholder="Select" />
						</SelectTrigger>
						<SelectContent className="bg-white">
							<SelectItem value="state1">State 1</SelectItem>
							<SelectItem value="state2">State 2</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
		</div>
	);

	return (
		<>
			<div className="p-6 bg-white w-full h-dvh hide-scrollbar overflow-y-scroll">
				<div className="space-y-6">
					<h2 className="text-2xl font-bold">Create Account</h2>

					<div className="space-y-4">
						<div className="flex justify-start">
							<div className="relative">
								<div className="w-28 h-28 rounded-lg border-2 border-solid border-gray-300 flex items-center justify-center overflow-hidden">
									{imagePreview ? (
										<img
											src={imagePreview}
											alt="Profile preview"
											className="w-full h-full object-cover"
										/>
									) : (
										<div className="flex flex-col justify-center items-center gap-4">
											<UserRound className="w-8 h-8 text-gray-400" />
											<div className="text-gray-600">Add Photo</div>
										</div>
									)}
								</div>
								<Label
									htmlFor="photo"
									className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer"
								>
									<Input
										id="photo"
										type="file"
										accept="image/*"
										className="hidden"
										onChange={handleImageUpload}
									/>
									<span className="sr-only">Add Photo</span>
									<Upload className="w-4 h-4" />
								</Label>
							</div>
							<div className="space-y-2 w-full ml-5">
								<Label htmlFor="fullName">Full Name</Label>
								<Input id="fullName" placeholder="Enter Full Name" required />
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="dob">Date of Birth</Label>
							<Input id="dob" type="date" required />
						</div>

						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="Enter Email"
								required
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="licenseId">License Registration ID</Label>
							<Input
								id="licenseId"
								placeholder="Enter License Registration ID"
								required
							/>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="mobile">Mobile Number</Label>
								<Input id="mobile" placeholder="Enter Mobile Number" required />
							</div>
							<div className="space-y-2">
								<Label htmlFor="emergency">Emergency Contact Number</Label>
								<Input
									id="emergency"
									placeholder="Enter Mobile Number"
									required
								/>
							</div>
						</div>

						<div className="space-y-4">
							{qualifications.map((qual, index) => (
								<QualificationFields
									key={qual.id}
									qualification={qual}
									showRemove={qualifications.length > 1}
								/>
							))}
						</div>

						<div
							className="text-indigo-800 font-semibold cursor-pointer"
							onClick={addQualification}
						>
							+ Add More Qualification
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
								</Button>
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="confirmPassword">Confirm Password</Label>
							<div className="relative">
								<Input
									id="confirmPassword"
									type={showConfirmPassword ? "text" : "password"}
									placeholder="Enter Password"
									required
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

						<div className="flex items-center space-x-2">
							<Checkbox id="terms" required />
							<label htmlFor="terms" className="text-sm text-gray-600">
								By signing up you agree to our{" "}
								<Link href="/terms" className="text-blue-600 hover:underline">
									Terms & Conditions
								</Link>{" "}
								and{" "}
								<Link href="/privacy" className="text-blue-600 hover:underline">
									Privacy Policy
								</Link>
							</label>
						</div>

						<Button className="w-full bg-indigo-600 text-white" size="lg">
							Create Account
						</Button>

						<div className="text-center text-sm">
							Already have an account?{" "}
							<Link
								to={`${baseRoute}/login`}
								className="text-blue-600 hover:underline"
							>
								Sign in
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
