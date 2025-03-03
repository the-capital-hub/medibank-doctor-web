import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { gql, useQuery } from "@apollo/client";
import { setPatientDetails } from "@/Redux/patientDetailsSlice";
import { Loader2 } from "lucide-react";
const GET_PATIENT_DETAILS = gql`
	query getPatientDetails($patientId: String!) {
		getPatientDetails(patientId: $patientId) {
			status
			data
			message
			
		}
	}
`;

export default function PatientSearchDialog({ open, onOpenChange }) {
	const dispatch = useDispatch();
	const { loading, error, refetch } = useQuery(GET_PATIENT_DETAILS, {
		skip: true,
		variables: { patientId: "" },
		onCompleted: (data) => {
			if (data?.getPatientDetails?.status) {
				onOpenChange(false);
				dispatch(setPatientDetails(data.getPatientDetails));
				navigate(`/consultation/${medilogId}`);

			}
		},
	});
	const navigate = useNavigate();
	const [medilogId, setMedilogId] = useState("");
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Medilog ID submitted:", medilogId);
		refetch({ patientId: medilogId });
		
	};

	const handleCancel = () => {
		onOpenChange(false);
		setMedilogId("");
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px] rounded-3xl bg-white">
				<DialogHeader className="flex flex-row items-center justify-between">
					<DialogTitle className="text-xl font-semibold">
						Consultation
					</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="space-y-2">
						<label className="text-sm font-medium">MID (Medical ID)</label>
						<Input
							placeholder="M12345"
							value={medilogId}
							onChange={(e) => setMedilogId(e.target.value)}
							
							className="h-12"
						/>
					</div>
					<div className="flex gap-4">
						<Button
							type="button"
							variant="outline"
							className="flex-1 text-base font-normal border-2"
							onClick={handleCancel}
							disabled={loading}
						>
							{loading ? <Loader2 className="animate-spin w-4 h-4" title="Cancelling"/> : ""}
							{loading ? "Cancelling..." : "Cancel"}
						</Button>
						<Button
							type="submit"
							className="flex-1 text-base font-normal text-white bg-indigo-600 hover:bg-indigo-700"
							disabled={loading}
						>
							{loading ? <Loader2 className="animate-spin w-4 h-4" title="Loading"/> : ""}
							{loading ? "Loading..." : "Continue"}
						</Button>
							{error && <span className="text-red-500">{error.message}</span>}
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
