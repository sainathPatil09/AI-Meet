import AuthForm from "../components/auth/AuthForm";
import { registerUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const handleRegister = async (data) => {
    // console.log(data)
    await registerUser(data);
    navigate("/login");
  };

  return <AuthForm onSubmit={handleRegister} isRegister />;
};

export default RegisterPage;
