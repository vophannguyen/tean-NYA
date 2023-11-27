import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "./authSlice";

/** This form allows users to register or log in. */
// export default function AuthForm() {
//   const navigate = useNavigate();

//   // Handles swapping between login and register
//   const [isLogin, setIsLogin] = useState(true);
//   const authAction = isLogin ? "Login" : "Register";
//   const altCopy = isLogin
//     ? "Need an account? Register here."
//     : "Already have an account? Login here.";

//   // Controlled form fields
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   // Form submission
//   const [login, { isLoading: loginLoading, error: loginError }] =
//     useLoginMutation();
//   const [register, { isLoading: registerLoading, error: registerError }] =
//     useRegisterMutation();

//   /** Send the requested authentication action to the API */
//   const attemptAuth = async (evt) => {
//     evt.preventDefault();

//     const authMethod = isLogin ? login : register;
//     const credentials = { username, password };

//     // We don't want to navigate if there's an error.
//     // `unwrap` will throw an error if there is one
//     // so we can use a try/catch to handle it.
//     try {
//       await authMethod(credentials).unwrap();
//       navigate("/");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <>
//       <h1>{authAction}</h1>
//       <form onSubmit={attemptAuth}>
//         <label>
//           Username
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             autoComplete="username"
//           />
//         </label>
//         <label>
//           Password
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             autoComplete="current-password"
//           />
//         </label>
//         <button>{authAction}</button>
//       </form>
//       <a onClick={() => setIsLogin(!isLogin)}>{altCopy}</a>

//       {(loginLoading || registerLoading) && <p>Please wait...</p>}
//       {loginError && <p role="alert">{loginError}</p>}
//       {registerError && <p role="alert">{registerError}</p>}
//     </>
//   );
// }

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginUser] = useLoginMutation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const attemptLogin = async (e) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    try{
      const response = await loginUser({ username, password }).unwrap();
      console.log("token", response.token);
      const welcomeMessage = "Give someone else a chance?";
      window.alert(welcomeMessage);
      navigate("/");
    } catch(error) {
  console.log(error);
  setError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h1 className="login-heading"> Log in </h1>
      <form className="login-form" onSubmit={attemptLogin}>
        <label className="login-username">Username</label>
        <input
          type = "text"
          value = {username}
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
          {loading &&<p>Logging in!</p>}
          {error && (
            <p className="login-error">
              Sorry, couldn't find you. Are you sure you have an account?
            </p>
          )}
      </form>
    </div>
  );
};

export default Login;
