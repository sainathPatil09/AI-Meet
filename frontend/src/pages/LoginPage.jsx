import AuthForm from "../components/auth/AuthForm";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { login } = useAuth();
  return <AuthForm onSubmit={login} />;
};

export default LoginPage;
