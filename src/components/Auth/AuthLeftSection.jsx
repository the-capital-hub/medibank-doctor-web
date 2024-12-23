import { useLocation } from "react-router-dom";
import MedibankLogo from "../../Images/medibank-logo.png";

export function AuthLeftSection() {
	const location = useLocation();
	const isLogin = location.pathname.includes("/login");
	const isAdmin = location.pathname.includes("/admin");
	const userType = isAdmin ? "Admin" : "Doctor";

	return (
		<div className={`flex flex-col items-center justify-center w-full sign-up-height rounded-3xl ${isLogin ? "bg-white" : "bg-gray-100"}`}>
			<div className="w-40 h-40 relative mb-8">
				<img
					src={MedibankLogo}
					alt="MediLog Logo"
					className="w-full h-full object-contain"
				/>
			</div>
			<h1 className="text-2xl font-bold text-center mb-4">
				Welcome to Medilog
				<br />
				{userType} Panel
			</h1>
			<p className="text-center text-gray-600">
				Revolutionising Healthcare with Centralised
				<br />
				Digital Health Records
			</p>
		</div>
	);
}
