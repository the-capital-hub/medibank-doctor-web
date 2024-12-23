import { AuthLayout } from "../../../components/Auth/AuthLayout";
import { AuthLeftSection } from "../../../components/Auth/AuthLeftSection";
import { LoginForm } from "../../../components/Auth/LoginForm";

export default function AdminLoginPage() {
	return (
		<AuthLayout leftSection={<AuthLeftSection />}>
			<LoginForm />
		</AuthLayout>
	);
}
