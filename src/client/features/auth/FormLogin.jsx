import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLoginMutation } from "./authSlice";
import "./formlogin.less";
import Spinner from "../utils/Spinner";

/** Login Form */
export default function LoginForm() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginUser] = useLoginMutation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  /// handle login
  const attemptLogin = async (e) => {
    e.preventDefault();

    setError(null);
    setLoading(true);
    //get token when logged ,and send message
    try {
      const response = await loginUser({ username, password }).unwrap();

      if (response.token) {
        navigate("/");
      } else {
        setError({
          message:
            "Sorry, couldn't log you in. Are you sure you have an account?",
        });
      }
    } catch (error) {
      console.log(error);
      setError({
        message: "An error occurred during login. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="login">
      <h1 className="login-heading"> Log in </h1>
      <form className="login-form" onSubmit={attemptLogin}>
        <label className="login-username">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
        <label className="login-password">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <button className="login-button">Log in</button>
        {loading && (
          <p>
            Logging in! <Spinner />
          </p>
        )}
        {error && <p className="login-error">{error.message}</p>}
        <Link to="/register">
          <p>Don't have an account? Register here.</p>
        </Link>
      </form>
    </section>
  );
}
