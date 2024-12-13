// import React from "react";
import medibankLogo from "../Images/medibank-logo.png"

export function Logo() {
	return (
		<div className="flex items-center gap-2">
			{/* <div className="font-bold text-xl text-purple-700">MediLog</div> */}
			<img src={medibankLogo} alt="Logo" className="h-20 w-20 mx-auto" />
		</div>
	);
}
