import { AuthLayout } from "../../../components/Auth/AuthLayout";
import { AuthLeftSection } from "../../../components/Auth/AuthLeftSection";
import { LoginForm } from "../../../components/Auth/LoginForm";

export default function DoctorLoginPage() {
	return (
		<AuthLayout leftSection={<AuthLeftSection />}>
			<LoginForm />
		</AuthLayout>
	);
}
