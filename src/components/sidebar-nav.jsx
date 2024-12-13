import { cn } from "@/lib/utils";
import { Home, MessageSquare } from "lucide-react";

const items = [
	{
		title: "Doctor Dashboard",
		icon: Home,
		href: "/dashboard",
		items: [
			{ title: "Consultation", href: "/consultation" },
			{ title: "List of patients", href: "/patients" },
			{ title: "Payment Receipts", href: "/payments" },
			{ title: "Request to admin", href: "/admin" },
		],
	},
	// {
	// 	title: "Consultation",
	// 	icon: MessageSquare,
	// 	href: "/consultation",
	// 	items: [
	// 		{ title: "List of patients", href: "/patients" },
	// 		{ title: "Payment Receipts", href: "/payments" },
	// 		{ title: "Request to admin", href: "/admin" },
	// 	],
	// },
];

export function SidebarNav({ className, isCollapsed, ...props }) {
	return (
		<div className={cn("flex flex-col gap-4", className)} {...props}>
			{items.map((item, index) => (
				<div key={index} className="flex flex-col gap-2">
					<a
						href={item.href}
						className={cn(
							"flex items-center gap-2 text-gray-700 hover:text-purple-700 transition-colors",
							isCollapsed && "justify-center"
						)}
					>
						<item.icon className="h-4 w-4" />
						{!isCollapsed && <span>{item.title}</span>}
					</a>
					{!isCollapsed && item.items.length > 0 && (
						<div className="flex flex-col gap-2 pl-6">
							{item.items.map((subItem, subIndex) => (
								<a
									key={subIndex}
									href={subItem.href}
									className="text-sm text-gray-600 hover:text-purple-700 transition-colors"
								>
									{subItem.title}
								</a>
							))}
						</div>
					)}
				</div>
			))}
		</div>
	);
}
