import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useRegisterMutation, useLoginMutation } from "./authSlice";
import "./formregister.less";

/** Register form , after they registered , log them in */
export default function RegisterForm() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [registerUser] = useRegisterMutation();
  const [loginUser] = useLoginMutation();

  //handle register
  const attemptRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await registerUser({
        firstName,
        lastName,
        email,
        username,
        password,
      }).unwrap();

      //login
      if (response.message === "Successfull") {
        const welcomeMessage = "Welcome to your Last Chance";
        window.alert(welcomeMessage);
        await loginUser({ username, password }).unwrap();
        navigate("/");
      } else {
        setError(response.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="register">
      <h1 className="register-heading">Register</h1>
      <form className="register-form" onSubmit={attemptRegister}>
        <label className="first-name">First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label className="last-name">Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label className="register-email">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="register-username">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="register-password">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="register-button">Register</button>
        {loading && <p>Registering!</p>}
        {error && <p className="error-message">{error}</p>}
        <Link to="/login">
          <p>Already have an account? Login here.</p>
        </Link>
      </form>
    </section>
  );
}
