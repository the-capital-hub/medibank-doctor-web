import { useLocation } from "react-router-dom";
export function AuthLayout({ children, leftSection }) {
	const location = useLocation();
	const isLogin = location.pathname.includes("/login");
	return (
		<div
			className={`min-h-screen ${isLogin ? "bg-gray-100" : "bg-white"} flex`}
		>
			<div className="hidden lg:flex lg:w-1/2 items-center justify-center p-4">
				{leftSection}
			</div>
			<div className="w-full lg:w-1/2 flex items-center justify-center">
				{children}
			</div>
		</div>
	);
}
