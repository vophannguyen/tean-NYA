import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useRegisterMutation, useLoginMutation } from "./authSlice";
import "./formlogin.less";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Arrow from "../utils/Arrow";

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
  const [isVisible, setIsVisible] = useState(false);

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
      <h1 className="heading">Sign Up</h1>
      <form className="register-form" onSubmit={attemptRegister}>
        <section className="field">
          <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          />
          <label className="first-name">FirstName</label>
        </section>
        <section className="field">
          <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          />
          <label className="last-name">LastName</label>
        </section>
        <section className="field">
          <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
          <label className="register-email">Email</label>
        </section>
        <section className="field">
          <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          />
          <label className="register-username">Username</label>
        </section>
        <section className="field">
          <input
          type={!isVisible ? "password" : "text"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
          <label className="register-password">Password</label>
          <div className="show-hide">
            {isVisible ? <VisibilityIcon onClick={() => setIsVisible(!isVisible)} /> : <VisibilityOffIcon onClick={() => setIsVisible(!isVisible)} />}
          </div>
        </section>
        <button className="register-button"><Arrow /></button>
        {loading && <p>Registering!</p>}
        {error && <p className="error-message">{error}</p>}
        <Link to="/login">
          <p>Already have an account? Login here.</p>
        </Link>
      </form>
    </section>
  );
}

