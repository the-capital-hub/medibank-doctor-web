import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./Pages/Dashboard";
import Consultation from "./components/Consultation";
import PatientList from "./components/PatientsList";
import Payments from "./components/Payments";

export default function Home() {
	return (
		<Router>
			<Routes>
				<Route element={<Layout />}>
					<Route path="/" element={<Dashboard />} />
					<Route path="/consultation" element={<Consultation />} />
					<Route path="/patients" element={<PatientList />} />
					<Route path="/payments" element={<Payments />} />
					<Route path="/admin" element={<Dashboard />} />
				</Route>
			</Routes>
		</Router>
	);
}
