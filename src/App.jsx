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
					<Route path="/consultation/summary" element={<Consultation />} />
					<Route path="/consultation/:medilogId" element={<Consultation />} />
					<Route path="/consultation/diagnosis" element={<Consultation />} />
					<Route path="/consultation/vitals" element={<Consultation />} />
					<Route path="/consultation/graphs" element={<Consultation />} />
					<Route path="/consultation/procedures" element={<Consultation />} />

					<Route path="/clinic" element={<Dashboard />} />
					<Route path="/clinic/appointments" element={<Dashboard />} />
					<Route path="/clinic/patients" element={<PatientList />} />
					<Route path="/clinic/payments" element={<Payments />} />
					<Route path="/clinic/support" element={<Dashboard />} />

					<Route path="/admin" element={<Dashboard />} />
				</Route>
			</Routes>
		</Router>
	);
}
