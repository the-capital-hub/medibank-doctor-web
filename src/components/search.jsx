// import React from "react";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export function Search() {
	return (
		<div className="relative">
			<SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
			<Input
				placeholder="Search"
				className="pl-8 w-[300px] bg-white rounded-full"
			/>
		</div>
	);
}
