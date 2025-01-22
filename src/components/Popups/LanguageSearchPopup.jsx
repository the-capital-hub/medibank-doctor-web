import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function LanguageSelector({
	open,
	onOpenChange,
	onLanguageSelect,
}) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-[400px] gap-6 p-6 bg-white">
				<DialogHeader>
					<DialogTitle className="text-2xl font-semibold text-center">
						Select Language
					</DialogTitle>
				</DialogHeader>
				<div className="my-1 mx-2 w-full">
					<div className="h-[1.75px] bg-gradient-to-r from-white via-black to-white w-full" />
				</div>
				<div className="grid grid-cols-2 gap-4">
					<Button
						variant="default"
						className="h-14 text-lg font-medium bg-[#27237C] hover:bg-[#1f1b66] text-white"
						onClick={() => {
							onLanguageSelect("english");
							onOpenChange(false);
						}}
					>
						English
					</Button>
					<Button
						variant="secondary"
						className="h-14 text-lg font-medium bg-gray-100 hover:bg-gray-200 text-gray-900"
						onClick={() => {
							onLanguageSelect("hindi");
							onOpenChange(false);
						}}
					>
						Hindi
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
