import { useState, useRef, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Search,
	Phone,
	Paperclip,
	Send,
	ChevronLeft,
	ChevronRight,
	X,
} from "lucide-react";
import DummyPic from "../../../Images/DummyPic.png";
import DummyPic1 from "../../../Images/DummyPic1.png";
import dummyConversations from "./dummyConversations";
import "./CustomerService.css";

export default function CustomerServicePage() {
	const [searchQuery, setSearchQuery] = useState("");
	const [currentMessage, setCurrentMessage] = useState("");
	const [activeChatId, setActiveChatId] = useState(1);
	const [selectedFile, setSelectedFile] = useState(null);
	const [messages, setMessages] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const fileInputRef = useRef(null);
	const messagesEndRef = useRef(null);
	const itemsPerPage = 5;

	const [conversationMessages, setConversationMessages] = useState({
		1: [
			// Default messages for conversation ID 1
			{
				id: 1,
				text: "Hello, I need assistance with making a payment using my VISA card. Please let me know the steps.",
				sender: "customer",
				timestamp: "05:45 PM",
				avatar: DummyPic,
			},
			{
				id: 2,
				text: "Please send basic details to this mail id mail@gmail.com",
				sender: "admin",
				timestamp: "05:46 PM",
				avatar: DummyPic1,
			},
		],
		// Add more initial messages for other conversations if needed
	});

	// Function to handle sending message in current conversation
	const handleSendMessage = () => {
		if (currentMessage.trim() || selectedFile) {
			const newMessage = {
				id: Date.now(),
				text: currentMessage,
				file: selectedFile,
				sender: "user",
				timestamp: new Date().toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit",
				}),
				avatar: DummyPic1,
				status: "sent",
			};

			setConversationMessages((prev) => ({
				...prev,
				[activeChatId]: [...(prev[activeChatId] || []), newMessage],
			}));

			setCurrentMessage("");
			setSelectedFile(null);
			if (fileInputRef.current) {
				fileInputRef.current.value = "";
			}
		}
	};

	// Get active conversation details
	const activeConversation = dummyConversations.find(
		(conv) => conv.id === activeChatId
	);

	// Memoized filtered conversations for better performance
	const filteredConversations = useMemo(() => {
		return dummyConversations.filter((conv) =>
			conv.name.toLowerCase().includes(searchQuery.toLowerCase())
		);
	}, [searchQuery]);

	const totalPages = Math.ceil(filteredConversations.length / itemsPerPage);

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	// Reset page when search changes
	useEffect(() => {
		setCurrentPage(1);
	}, [searchQuery]);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	const getStatusColor = (status) => {
		const statusColors = {
			closed: "bg-orange-100 text-orange-600",
			reopen: "bg-green-100 text-green-600",
			completed: "bg-blue-100 text-blue-600",
			default: "bg-gray-100 text-gray-600",
		};
		return statusColors[status.toLowerCase()] || statusColors.default;
	};

	const handleFileUpload = (e) => {
		const file = e.target.files?.[0];
		if (file) {
			// Add file size validation (5MB limit)
			if (file.size > 5 * 1024 * 1024) {
				alert("File size too large. Please select a file under 5MB.");
				return;
			}
			setSelectedFile(file);
		}
	};

	// const handleSendMessage = () => {
	// 	if (currentMessage.trim() || selectedFile) {
	// 		const newMessage = {
	// 			id: messages.length + 1,
	// 			text: currentMessage,
	// 			file: selectedFile,
	// 			sender: "user",
	// 			timestamp: new Date().toLocaleTimeString([], {
	// 				hour: "2-digit",
	// 				minute: "2-digit",
	// 			}),
	// 			status: "sent", // Added message status
	// 		};
	// 		setMessages([...messages, newMessage]);
	// 		setCurrentMessage("");
	// 		setSelectedFile(null);
	// 		if (fileInputRef.current) {
	// 			fileInputRef.current.value = "";
	// 		}
	// 	}
	// };

	const handleKeyPress = (e) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}
	};

	const handlePageChange = (page) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
		}
	};

	return (
		<div className="flex h-screen customer-service-container">
			{/* Sidebar */}
			<div className="w-80 border-r flex flex-col">
				<div className="flex items-center gap-3 pl-4 pt-4">
					<ChevronLeft className="h-6 w-6" />
					<span className="font-medium">Customer Service</span>
				</div>

				{/* Search Section */}
				<div className="p-4 border-b">
					<div className="relative">
						<Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
						<Input
							placeholder="Search messages"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="pl-8"
						/>
					</div>
				</div>

				{/* Conversations List */}
				<ScrollArea className="flex-1">
					{filteredConversations
						.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
						.map((conversation) => (
							<div
								key={conversation.id}
								onClick={() => setActiveChatId(conversation.id)}
								className={`
                  group relative p-4 transition-all duration-200 ease-in-out
                  border-b hover:bg-gray-50 cursor-pointer
                  ${
										activeChatId === conversation.id
											? "bg-gray-50 hover:bg-gray-100"
											: "hover:bg-gray-50"
									}
                `}
								role="button"
								tabIndex={0}
								onKeyPress={(e) =>
									e.key === "Enter" && setActiveChatId(conversation.id)
								}
							>
								<div className="flex items-start gap-4">
									<Avatar className="flex-shrink-0 ring-2 ring-offset-2 ring-transparent group-hover:ring-purple-200 transition-all duration-200">
										<AvatarImage
											src={conversation.avatar}
											alt={conversation.name}
										/>
										<AvatarFallback className="bg-purple-100 text-purple-700">
											{conversation.name[0]}
										</AvatarFallback>
									</Avatar>

									<div className="flex-1 min-w-0 space-y-1">
										<div className="flex items-center justify-between">
											<h3 className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">
												{conversation.name}
											</h3>
											<span className="text-xs text-gray-500 tabular-nums">
												{conversation.timestamp}
											</span>
										</div>

										<p className="text-sm text-gray-600 line-clamp-1">
											{conversation.message}
										</p>

										<Badge
											className={`mt-2 px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(
												conversation.status
											)}`}
										>
											{conversation.status}
										</Badge>
									</div>
								</div>

								{activeChatId === conversation.id && (
									<div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500" />
								)}
							</div>
						))}
				</ScrollArea>

				{/* Pagination */}
				<div className="p-4 border-t flex items-center justify-between">
					<div className="flex gap-1">
						<Button
							variant="outline"
							size="icon"
							onClick={() => handlePageChange(currentPage - 1)}
							disabled={currentPage === 1}
						>
							<ChevronLeft className="h-4 w-4" />
						</Button>
						{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
							<Button
								key={page}
								onClick={() => handlePageChange(page)}
								variant={currentPage === page ? "default" : "outline"}
								className={`
          transition-all duration-200
          ${
						currentPage === page
							? "bg-purple-600 hover:bg-purple-700 text-white"
							: "hover:bg-purple-50"
					}
        `}
							>
								{page}
							</Button>
						))}
						<Button
							variant="outline"
							size="icon"
							onClick={() => handlePageChange(currentPage + 1)}
							disabled={currentPage === totalPages}
						>
							<ChevronRight className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</div>

			{/* Chat Area */}
			<div className="flex-1 flex flex-col">
				{/* Dynamic Chat Header */}
				<div className="p-4 border-b flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Avatar>
							<AvatarImage
								src={activeConversation?.avatar || DummyPic}
								alt={activeConversation?.name}
							/>
							<AvatarFallback>
								{activeConversation?.name?.[0] || "U"}
							</AvatarFallback>
						</Avatar>
						<div>
							<div className="font-medium">
								{activeConversation?.name || "Select a conversation"}
							</div>
							<div className="flex items-center gap-1">
								<div className="w-2 h-2 bg-green-500 rounded-full" />
								<span className="text-sm text-gray-500">Online</span>
							</div>
						</div>
					</div>
					<div className="flex items-center gap-3">
						<Button variant="outline">Postpone</Button>
						<Button className="gap-2">
							<Phone className="h-4 w-4" />
							Call
						</Button>
					</div>
				</div>

				{/* Dynamic Messages Area */}
				<ScrollArea className="flex-1 p-4">
					<div className="space-y-4">
						{conversationMessages[activeChatId]?.map((msg) => (
							<div
								key={msg.id}
								className={`flex items-start gap-2 ${
									msg.sender === "user" ? "flex-row-reverse" : "flex-row"
								}`}
							>
								<Avatar className="flex-shrink-0">
									<AvatarImage
										src={msg.avatar}
										alt={
											msg.sender === "user" ? "User" : activeConversation?.name
										}
									/>
									<AvatarFallback>
										{msg.sender === "user"
											? "U"
											: activeConversation?.name?.[0]}
									</AvatarFallback>
								</Avatar>

								<div
									className={`flex flex-col ${
										msg.sender === "user" ? "items-end" : "items-start"
									} max-w-[70%]`}
								>
									<div
										className={`inline-block rounded-lg p-3 ${
											msg.sender === "user" ? "bg-purple-100" : "bg-gray-100"
										}`}
									>
										<p className="break-words">{msg.text}</p>
										{msg.file && (
											<div className="mt-2">
												<img
													src={URL.createObjectURL(msg.file)}
													alt="Uploaded file"
													className="max-w-full h-auto rounded"
													onLoad={() =>
														URL.revokeObjectURL(URL.createObjectURL(msg.file))
													}
												/>
											</div>
										)}
									</div>
									<span className="text-xs text-gray-500 mt-1">
										{msg.timestamp}
										{msg.status && <span className="ml-2">{msg.status}</span>}
									</span>
								</div>
							</div>
						))}
						<div ref={messagesEndRef} />
					</div>
				</ScrollArea>

				{/* Message Input */}
				{activeConversation && ( // Only show input if a conversation is selected
					<div className="p-4 border-t">
						<div className="flex gap-2">
							<input
								type="file"
								ref={fileInputRef}
								onChange={handleFileUpload}
								className="hidden"
								accept="image/*"
							/>
							<Button
								variant="ghost"
								size="icon"
								onClick={() => fileInputRef.current?.click()}
							>
								<Paperclip className="h-4 w-4" />
							</Button>
							<Input
								placeholder={`Message ${activeConversation.name}...`}
								value={currentMessage}
								onChange={(e) => setCurrentMessage(e.target.value)}
								onKeyPress={handleKeyPress}
							/>
							<Button size="icon" onClick={handleSendMessage}>
								<Send className="h-4 w-4" />
							</Button>
						</div>
						{selectedFile && (
							<div className="mt-2 p-2 bg-gray-100 rounded-lg flex items-center justify-between">
								<span className="text-sm truncate">{selectedFile.name}</span>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => {
										setSelectedFile(null);
										if (fileInputRef.current) {
											fileInputRef.current.value = "";
										}
									}}
								>
									<X className="h-4 w-4" />
								</Button>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
