// import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const Breadcrumbs = ({ items }) => {
	return (
		<nav className="flex" aria-label="Breadcrumb">
			<ol className="inline-flex items-center space-x-1 md:space-x-2">
				{items.map((item, index) => (
					<li key={index} className="inline-flex items-center">
						{index > 0 && (
							<ChevronRight className="h-4 w-4 text-gray-400 mx-1" />
						)}
						{index === items.length - 1 ? (
							<span className="text-indigo-700 font-medium" aria-current="page">
								{item.label}
							</span>
						) : (
							<Link
								to={item.href}
								className="text-gray-700 hover:text-gray-900"
							>
								{item.label}
							</Link>
						)}
					</li>
				))}
			</ol>
		</nav>
	);
};

export default Breadcrumbs;
