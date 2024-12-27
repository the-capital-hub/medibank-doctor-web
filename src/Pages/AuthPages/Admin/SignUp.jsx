import { AuthLayout } from "../../../components/Auth/AuthLayout";
import { AuthLeftSection } from "../../../components/Auth/AuthLeftSection";
import { SignupForm } from "../../../components/Auth/SignUpForm";

export default function AdminSignupPage() {
	return (
		<AuthLayout leftSection={<AuthLeftSection />}>
			<SignupForm />
		</AuthLayout>
	);
}
