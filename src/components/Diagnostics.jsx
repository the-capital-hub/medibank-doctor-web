import React from "react";
import { ArrowLeft, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Breadcrumbs from "@/components/Breadcrumbs";

const getRandomColorClass = () => {
	const colors = [
		"bg-red-100",
		"bg-blue-100",
		"bg-green-100",
		"bg-yellow-100",
		"bg-purple-100",
		"bg-pink-100",
		"bg-indigo-100",
		"bg-teal-100",
		"bg-gray-100",
	];
	return colors[Math.floor(Math.random() * colors.length)];
};

const breadcrumbItems = [
	{ label: "Home", href: "/" },
	{ label: "Consultation", href: "/consultation" },
	{ label: "Diagnostics", href: "/consultation/diagnostics" },
];

const Diagnostics = () => {
	return (
		<div className="container mx-auto p-6">
			<div className="mb-8">
				<div className="flex items-center mb-4">
					<Button variant="ghost" asChild>
						<Link to="/">
							<ArrowLeft className="mr-2 h-4 w-4" />
						</Link>
					</Button>
					<Breadcrumbs items={breadcrumbItems} />
				</div>

				{/* Patient Info Card */}
				<Card className="p-4 pb-0 mb-2 ">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-3">
						<div>
							<span className="font-medium">Patient Name: </span>
							<span>User Name</span>
						</div>
						{/* <div>
							<span className="font-medium">MBID: </span>
							<span>M1234567890</span>
							</div> */}
						<div>
							<span className="font-medium">Date of Birth: </span>
							<span>01-01-1989</span>
						</div>
						<div>
							<span className="font-medium">Gender: </span>
							<span>Male</span>
						</div>
						{/* <div>
							<span className="font-medium">Address: </span>
							<span>Hyderabad, Telangana</span>
							</div> */}
					</div>
					<hr />
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-3 pb-3">
						<div>
							<span className="font-medium">MID: </span>
							<span>M1234567890</span>
						</div>
						<div>
							<span className="font-medium">Address: </span>
							<span>Hyderabad, Telangana</span>
						</div>
					</div>
					<hr />
					<div className="grid grid-cols-4 gap-4">
						<Button
							variant="contained"
							className="m-3  bg-indigo-800 text-white  text-center"
						>
							<Link to="/consultation/diagnosis">Diagnosis</Link>
							{/* <img src={Add_Icon} alt="Add Icon" className="inline h-4 w-4" /> */}
						</Button>
						<Button variant="contained" className="m-3 text-center">
							<Link to="/consultation/vitals">Vitals & BMI </Link>
							{/* <img src={Add_Icon} alt="Add Icon" className="inline h-4 w-4" /> */}
						</Button>
						<Button variant="contained" className="m-3  text-center">
							<Link to="/consultation/healthgraphs">Health graphs </Link>
							{/* <img src={Add_Icon} alt="Add Icon" className="inline h-4 w-4" /> */}
						</Button>
						<Button variant="contained" className="m-3  text-center">
							<Link to="/consultation/procedures">Procedures </Link>
							{/* <img src={Add_Icon} alt="Add Icon" className="inline h-4 w-4" /> */}
						</Button>
					</div>
					<hr />
					{/* <div className="grid grid-cols-5 gap-5 py-4 overflow-y-auto max-h-[330px] hide-scrollbar"> */}
					<div className="grid grid-cols-5 gap-5 py-4">
						{Array.from({ length: 20 }, (_, index) => ({
							complaint: `Complaint ${index + 1}`, // Example complaint text
							date: `Date ${index + 1}`, // Example date
							doctor: `Doctor ${index + 1}`, // Example doctor name
							color: getRandomColorClass(),
						})).map((item, index) => (
							<div
								key={index}
								className={`rounded-lg p-4 ${item.color} cursor-pointer max-h-fit`}
								// onClick={() => handleConsultationClick(item)}
							>
								<div className="mb-2">
									<div className="text-sm text-gray-600">Chief Complaint:</div>
									<div className="font-medium">{item.complaint}</div>
								</div>
								<div className="flex justify-between text-sm text-gray-600">
									<span>{item.date}</span>
									<span>{item.doctor}</span>
								</div>
							</div>
						))}
					</div>

					<div className="flex justify-center p-5">
						<Button className="text-center text-white font-bold bg-amber-400 rounded-md p-3">
							Load More
						</Button>
					</div>

					<div className="flex justify-end p-5 ">
						<Plus className="text-white bg-green-600 w-12 h-12 rounded-3xl shadow-2xl cursor-pointer" />
					</div>
				</Card>
			</div>
		</div>
	);
};

export default Diagnostics;
