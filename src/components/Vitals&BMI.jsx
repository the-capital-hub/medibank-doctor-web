import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import VitalsCard from "./Popups/components/VitalsCard";

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

const Diagnostics = () => {
	return (
		<div className="container mx-auto p-6">
			<div className="mb-8">
				<Button variant="ghost" className="mb-4">
					<Link to="/">
						<ArrowLeft className="mr-2 h-4 w-4" />
					</Link>
					Consultation
				</Button>

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
						<Button variant="contained" className="m-3  text-center">
							Diagnosis{" "}
							{/* <img src={Add_Icon} alt="Add Icon" className="inline h-4 w-4" /> */}
						</Button>
						<Button
							variant="contained"
							className="m-3 bg-indigo-800 text-white text-center"
						>
							Vitals & BMI{" "}
							{/* <img src={Add_Icon} alt="Add Icon" className="inline h-4 w-4" /> */}
						</Button>
						<Button variant="contained" className="m-3  text-center">
							Health graphs{" "}
							{/* <img src={Add_Icon} alt="Add Icon" className="inline h-4 w-4" /> */}
						</Button>
						<Button variant="contained" className="m-3  text-center">
							Procedures{" "}
							{/* <img src={Add_Icon} alt="Add Icon" className="inline h-4 w-4" /> */}
						</Button>
					</div>
					<hr />
					<div className="grid grid-cols-[1fr_2fr] gap-4">
						<div className="">
							<h2 className=" text-indigo-800 text-left mb-6 font-extrabold">
								Vitals
							</h2>
							<div className="grid grid-cols-2 gap-4">
								<VitalsCard
									title="Blood Sugar"
									value="80"
									unit="mg/dL"
									status="Normal"
									trend="up"
									color="bg-orange-50"
									width={150}
								/>
								<VitalsCard
									title="Heart Rate"
									value="98"
									unit="bpm"
									status="Normal"
									trend="stable"
									color="bg-red-50"
									width={150}
								/>
								<VitalsCard
									title="Blood Pressure"
									value="102/72"
									unit="mmHg"
									status="Normal"
									trend="down"
									color="bg-blue-50"
									width={150}
								/>
								<VitalsCard
									title="SPO2"
									value="102/72"
									unit="mmHg"
									status="Normal"
									trend="down"
									color="bg-blue-50"
									width={150}
								/>
							</div>

							<div className="flex justify-between py-5">
								<span>Dr John Doe</span>
								<span className="pr-5">30 Jan 2024</span>
							</div>
						</div>

						<div className="">
							<h2 className=" text-indigo-800 text-left mb-6 font-extrabold">
								BMI
							</h2>
							<div className="flex flex-col md:flex-row gap-6 items-start">
								<div className="flex flex-col gap-4">
									<div className=" p-2 rounded-lg shadow-sm bg-red-50 border-red-200 border">
										<div className="text-indigo-800 font-semibold">Weight</div>
										<div className="font-semibold">87 Kg</div>
										<div className="text-indigo-800 font-semibold">Last Measurement: 82 Kg</div>
										<div className="font-semibold text-xs">30 May 2024</div>
									</div>

									<div className="">
										<div className="p-2 rounded-lg shadow-sm bg-green-50 border-green-200 border">
											<div className="text-indigo-800 font-semibold">Weight</div>
											<div className="font-semibold">87 Kg</div>
											<div className="text-indigo-800 font-semibold">
												Last Measurement: 82 Kg
											</div>
											<div className="font-semibold text-xs">30 May 2024</div>
										</div>
									</div>
									<div className="">
										<div className="p-2 rounded-lg shadow-sm bg-green-50 border-green-200 border">
											<div className="font-semibold text-indigo-800">Weight</div>
											<div className="font-semibold">87 Kg</div>
											<div className="font-semibold text-indigo-800">
												Last Measurement: 82 Kg
											</div>
											<div className="text-xs font-semibold">30 May 2024</div>
										</div>
									</div>
									<div className="">
										<div className="bg-green-50 border-green-200 border p-2 rounded-lg shadow-sm">
											<div className="text-indigo-800 font-semibold">Weight</div>
											<div className="font-semibold">87 Kg</div>
											<div className="text-indigo-800 font-semibold">
												Last Measurement: 82 Kg
											</div>
											<div className="font-semibold text-xs">30 May 2024</div>
										</div>
									</div>
								</div>
								<div className="relative w-1/4 h-96">
									<div className="absolute right-0 w-full h-full flex items-center justify-center">
										<Avatar className="w-full h-full rounded-none">
											<AvatarImage
												src={`/src/Images/BMIBOY.png`}
												width={256}
												height={384}
												className="w-[100%] h-full"
												alt="Body measurements"
											/>
											<AvatarFallback>N</AvatarFallback>
										</Avatar>
									</div>
								</div>
								<div className="space-y-4 w-1/3">
									<Card className="p-4 bg-orange-100">
										<div className="text-sm text-gray-600">Height</div>
										<div className="text-xl font-semibold">170 cm</div>
									</Card>
									<Card className="p-4 bg-cyan-100">
										<div className="text-sm text-gray-600">Weight</div>
										<div className="text-xl font-semibold">72 kg</div>
									</Card>
									<Card className="p-6" style={{ backgroundColor: "#4A4949" }}>
										<div className="text-sm text-white mb-2">
											Body Mass Index (BMI)
										</div>
										<div className="text-3xl font-semibold mb-4 text-white">
											24.9
										</div>
										<div className="h-2 bg-gradient-to-r from-green-300 via-yellow-300 to-red-300 rounded-full mb-2" />
										<div className="flex justify-between text-sm text-white">
											<span>15</span>
											<span>18.5</span>
											<span>25</span>
											<span>30</span>
											<span>40</span>
										</div>
										<div className="mt-4 inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full">
											You&apos;re Healthy
										</div>
									</Card>
								</div>
							</div>
						</div>
					</div>
				</Card>
			</div>
		</div>
	);
};

export default Diagnostics;
