// import React from "react";
import { Link } from "react-router-dom";
import medibankLogo from "../Images/medibank-logo.png";

export function Logo() {
	return (
		<div className="flex items-center gap-2">
			<Link to="/" className="h-20 w-20 mx-auto">
				<img src={medibankLogo} alt="Logo" className="h-20 w-20 mx-auto" />
			</Link>
		</div>
	);
}
