import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DoctorsLayout from "./components/DoctorsLayout";
import AdminLayout from "./components/AdminDashboardComponents/AdminLayout";
import DoctorDashboard from "./Pages/DoctorDashboard";
import Consultation from "./components/Consultation";
import PatientList from "./components/PatientsList";
import Diagnosis from "./components/Diagnostics";
import Vitals_BMI from "./components/Vitals&BMI";
import Procedures from "./components/Procedures";
import Payments from "./components/Payments";
import CustomerService from "./components/AdminDashboardComponents/CustomerService/CustomerService";
import AdminDashboard from "./Pages/AdminDashboard/Dashboard";

import AdminLogin from "./Pages/AuthPages/Admin/Login";
import AdminSignup from "./Pages/AuthPages/Admin/SignUp";
import DoctorLogin from "./Pages/AuthPages/Doctors/Login";
import DoctorSignup from "./Pages/AuthPages/Doctors/SignUp";

export default function Home() {
	return (
		<Router>
			<Routes>
				<Route path="/admin/login" element={<AdminLogin />} />
				<Route path="/admin/signup" element={<AdminSignup />} />
				<Route path="/doctor/login" element={<DoctorLogin />} />
				<Route path="/doctor/signup" element={<DoctorSignup />} />

				<Route element={<DoctorsLayout />}>
					<Route path="/" element={<DoctorDashboard />} />
					<Route path="/consultation" element={<Consultation />} />
					<Route path="/consultation/summary" element={<Consultation />} />
					<Route path="/consultation/:medilogId" element={<Consultation />} />
					<Route path="/consultation/diagnosis" element={<Diagnosis />} />
					<Route path="/consultation/vitals" element={<Vitals_BMI />} />
					<Route path="/consultation/graphs" element={<Consultation />} />
					<Route path="/consultation/procedures" element={<Procedures />} />
					<Route path="/clinic" element={<DoctorDashboard />} />
					<Route path="/clinic/appointments" element={<DoctorDashboard />} />
					<Route path="/clinic/patients" element={<PatientList />} />
					<Route path="/clinic/payments" element={<Payments />} />
					<Route path="/clinic/support" element={<DoctorDashboard />} />
					<Route path="/admin" element={<DoctorDashboard />} />
				</Route>

				<Route element={<AdminLayout />}>
					<Route path="/admin/dashboard" element={<AdminDashboard />} />
					<Route path="/admin/medico-legal" element={<AdminDashboard />} />
					<Route path="/admin/customer-service" element={<CustomerService />} />
					<Route path="/admin/push-notification" element={<AdminDashboard />} />
				</Route>
			</Routes>
		</Router>
	);
}
