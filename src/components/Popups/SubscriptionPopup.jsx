import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight } from "lucide-react";
import DummyPic from "../../Images/DummyPic.png";
import DummyApp from "../../Images/DummyApp.png";

export default function SubscriptionPopup({ open, close }) {
	const [activeView, setActiveView] = useState("status");
	const [planType, setPlanType] = useState("single");
	const [duration, setDuration] = useState("3months");
	const [upiId, setUpiId] = useState("");
	const [card, setCard] = useState({
		number: "",
		cvv: "",
		expiry: "",
	});
	const [selectedOption, setSelectedOption] = useState(null);

	const plans = {
		"3months": { price: 2000, label: "3 Months" },
		"6months": { price: 4000, label: "6 Months" },
		annual: { price: 8000, label: "Annual" },
	};
	const payments = [
		{ id: 1, date: "Sep 10, 24", amount: "xxxx" },
		{ id: 2, date: "Sep 10, 24", amount: "xxxx" },
		{ id: 3, date: "Sep 10, 24", amount: "xxxx" },
	];

	const handleClose = () => {
		setActiveView("status");
		close(false);
	};
	const handleChange = (e) => {
		const { name, value } = e.target;
		setCard((prevCard) => ({
			...prevCard,
			[name]: value,
		}));
	};
	const handleCheckboxChange = (value) => {
		setSelectedOption((prevSelected) =>
			prevSelected === value ? null : value
		);
	};

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className="sm:max-w-[425px] rounded-3xl p-0 bg-white">
				<DialogHeader className="p-6 pb-0">
					<div className="flex items-center justify-between">
						<DialogTitle className="text-xl font-semibold">
							{activeView === "success" ? "Payment Successful" : "Subscription"}
						</DialogTitle>
					</div>
				</DialogHeader>
				<div className="px-6 pb-6">
					{activeView === "status" && (
						<div className="space-y-6">
							<div
								className="cursor-pointer flex items-center justify-between"
								onClick={() => setActiveView("status")}
							>
								<span className="text-purple-600 font-medium">
									Subscription Status
								</span>
								<ChevronRight className="h-5 w-5 text-purple-600 transform rotate-90" />
							</div>

							<div className="bg-purple-600 text-white rounded-3xl p-6 space-y-2">
								<h3 className="text-2xl font-medium">Active Plan</h3>
								<p className="text-purple-200">Purchased Plan</p>
								<p className="text-3xl font-semibold">Rs 2,000</p>
								<p className="text-purple-200">Your are on an Annual Plan</p>
								<p className="text-purple-200">
									Current subscription ends on 01/10/2025
								</p>
							</div>

							<button
								className="w-full py-4 flex items-center justify-between border-t"
								onClick={() => setActiveView("payments")}
							>
								<span>Past Payments</span>
								<ChevronRight className="h-5 w-5" />
							</button>

							<button
								className="w-full py-4 flex items-center justify-between border-t"
								onClick={() => setActiveView("renew")}
							>
								<span>Renew Subscription</span>
								<ChevronRight className="h-5 w-5" />
							</button>
						</div>
					)}
					{activeView === "payments" && (
						<div className="space-y-6">
							<button
								className="w-full flex items-center justify-between"
								onClick={() => setActiveView("status")}
							>
								<span>Subscription Status</span>
								<ChevronRight className="h-5 w-5" />
							</button>

							<div>
								<div className="flex items-center justify-between mb-4">
									<span className="text-purple-600 font-medium">
										Past Payments
									</span>
									<ChevronRight className="h-5 w-5 text-purple-600 transform rotate-90" />
								</div>

								<div className="space-y-4">
									{payments.map((payment) => (
										<div
											key={payment.id}
											className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
										>
											<div className="flex items-center gap-3">
												<div className="relative h-10 w-10">
													<img
														src={DummyApp}
														alt="Medibank Plus"
														className="object-cover"
													/>
												</div>
												<div>
													<p className="font-medium">Medibank Plus</p>
													<p className="text-sm text-gray-500">
														{payment.date}
													</p>
												</div>
											</div>
											<p className="font-medium">Rs:{payment.amount}</p>
										</div>
									))}
								</div>
							</div>

							<button
								className="w-full py-4 flex items-center justify-between border-t"
								onClick={() => setActiveView("renew")}
							>
								<span>Renew Subscription</span>
								<ChevronRight className="h-5 w-5" />
							</button>
						</div>
					)}
					{activeView === "renew" && (
						<div className="space-y-6">
							<button
								className="w-full flex items-center justify-between"
								onClick={() => setActiveView("status")}
							>
								<span>Subscription Status</span>
								<ChevronRight className="h-5 w-5" />
							</button>
							{/* <button
								className="w-full flex items-center justify-between"
								onClick={() => setActiveView("payments")}
							>
								<span>Past Payments</span>
								<ChevronRight className="h-5 w-5" />
							</button> */}

							<div className="flex items-center justify-between mb-4">
								<span className="text-purple-600 font-medium">
									Renew Subscription
								</span>
								<ChevronRight className="h-5 w-5 text-purple-600 transform rotate-90" />
							</div>

							<div className="h-[calc(100vh-200px)] overflow-y-auto pr-4 -mr-4 hide-scrollbar">
								<div className="flex gap-2 mb-4">
									<Button
										variant={planType === "single" ? "default" : "secondary"}
										className={`flex-1 ${
											planType === "single" ? "bg-purple-600" : ""
										}`}
										onClick={() => setPlanType("single")}
									>
										Basic
									</Button>
									<Button
										variant={planType === "family" ? "default" : "secondary"}
										className={`flex-1 ${
											planType === "family" ? "bg-purple-600" : ""
										}`}
										onClick={() => setPlanType("family")}
									>
										Pro
									</Button>
								</div>

								<div className="grid grid-cols-3 gap-2 mb-6">
									{Object.entries(plans).map(([key, plan]) => (
										<button
											key={key}
											className={`p-4 rounded-lg text-center ${
												duration === key
													? "bg-purple-600 text-white"
													: "bg-gray-100 text-gray-900"
											}`}
											onClick={() => setDuration(key)}
										>
											<div className="text-sm">{plan.label}</div>
											<div className="font-semibold">Rs {plan.price}</div>
										</button>
									))}
								</div>

								<div className="space-y-4">
									<h3 className="font-medium">Pay by any UPI App</h3>

									{["Google Pay", "PhonePe", "Paytm"].map((app) => (
										<button
											key={app}
											className="w-full flex items-center justify-between p-4 border rounded-lg"
										>
											<div className="flex items-center gap-3">
												<div className="relative h-10 w-10">
													<img
														src={DummyApp}
														alt={app}
														className="object-cover"
													/>
												</div>
												<span>{app}</span>
											</div>
											<input
												type="radio"
												checked={selectedOption === app}
												onChange={() => handleCheckboxChange(app)}
											/>
										</button>
									))}

									<button className="w-full flex items-center gap-3 p-4 border rounded-lg text-purple-600">
										<div className="h-6 w-6 rounded bg-purple-100 flex items-center justify-center">
											+
										</div>
										<div className="text-left flex-1">
											<Input
												placeholder="Enter your UPI ID"
												value={upiId}
												onChange={(e) => setUpiId(e.target.value)}
											/>
											<div className="text-sm text-gray-500">
												You need to have a registered UPI ID
											</div>
										</div>
									</button>
								</div>

								<div className="mt-6 mb-4">
									<h3 className="font-medium mb-4">Credit & Debit Cards</h3>
									<button className="w-full flex items-center gap-3 p-4 border rounded-lg text-purple-600">
										<div className="h-6 w-6 rounded bg-purple-100 flex items-center justify-center">
											+
										</div>
										<div className="text-left flex-1">
											<Input
												name="number"
												placeholder="Card Number"
												value={card.number}
												onChange={handleChange}
											/>
											<div className="flex gap-3 mt-2">
												<Input
													name="expiry"
													placeholder="Expiry"
													value={card.expiry}
													onChange={handleChange}
												/>
												<Input
													name="cvv"
													placeholder="CVV"
													value={card.cvv}
													onChange={handleChange}
												/>
											</div>
											<div className="text-sm text-gray-500">
												Save and Pay via Cards
											</div>
										</div>
									</button>
								</div>

								{/* Button to Pay now and navigate to payment page */}
								<Button
									className="w-full bg-purple-600 hover:bg-purple-700 mt-3 mb-3"
									onClick={() => {
										setActiveView("success");
										setTimeout(() => {
											close(false);
										}, 5000);
									}}
								>
									Pay Now
								</Button>
							</div>
						</div>
					)}
					{activeView === "success" && (
						<div className="flex flex-col items-center text-center">
							<h2 className="text-2xl font-semibold mb-1">Thank You!</h2>
							<p className="text-gray-500 mb-6">Yay! Payment Received</p>

							<div className="bg-purple-600 text-white rounded-3xl p-6 w-full mb-6">
								<div className="flex items-center gap-3 mb-4 pb-4 border-b border-purple-500">
									<div className="relative h-12 w-12 rounded-full overflow-hidden">
										<img src={DummyPic} alt="User" className="object-cover" />
									</div>
									<div className="text-left">
										<p className="text-lg">Kiran Kumar</p>
										<p className="text-sm text-purple-200">ID : 656352165</p>
									</div>
								</div>

								<div className="space-y-2 text-left">
									<div className="flex justify-between">
										<span className="text-purple-200">Name:</span>
										<span>Kiran Kumar</span>
									</div>
									<div className="flex justify-between">
										<span className="text-purple-200">Time:</span>
										<span>11:30 AM</span>
									</div>
									<div className="flex justify-between">
										<span className="text-purple-200">Date:</span>
										<span>28/08/2024</span>
									</div>
									<div className="flex justify-between">
										<span className="text-purple-200">Total:</span>
										<span>Rs xxxx</span>
									</div>
								</div>
							</div>

							<Button
								className="w-full bg-purple-600 hover:bg-purple-700"
								onClick={() => setActiveView("status")}
							>
								Done
							</Button>
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
