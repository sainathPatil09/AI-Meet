import { useState } from "react";

const AuthForm = ({ onSubmit, isRegister = false }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
//   console.log(form)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      {isRegister && (
        <input name="name" placeholder="Name" onChange={handleChange} required />
      )}
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">{isRegister ? "Register" : "Login"}</button>
    </form>
  );
};

export default AuthForm;
