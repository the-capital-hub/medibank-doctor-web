import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
export default function LogoutAlert({ open, onOpenChange, onLogout, loading, error }) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px] rounded-3xl z-50 bg-white">
				<DialogHeader>
					<DialogTitle className="text-xl font-semibold">Alert</DialogTitle>
				</DialogHeader>
				<div className="flex flex-col items-center gap-6 py-4">
					<p className="text-center text-lg text-gray-700">
						Are you sure want to logout?
					</p>
					<div className="flex gap-4 w-full">
						<Button
							variant="outline"
							className="flex-1 text-base font-normal border-2"
							onClick={() => onOpenChange(false)}
						>
							Cancel
						</Button>
						<Button
							className="flex-1 text-base text-white font-normal bg-indigo-800 hover:bg-indigo-700"
							onClick={onLogout} disabled={loading}
						>
							{loading ? <Loader2 className="animate-spin w-4 h-4" title="Logging out"/> : ""}
							{loading ? "Logging out..." : "Yes, Logout"}

						</Button>
						{error && <p className="text-red-500">{error}</p>}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
