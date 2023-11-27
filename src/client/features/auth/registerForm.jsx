import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "./authSlice";

const Register = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName]= useState("");
    const [lastName, setLastName] = useState("");

    const [registerUser] = useRegisterMutation();
    const [loading, setLoading] = useState(false);
    const [error,setError] = useState(false);

    const attemptRegister = async (e) => {
        e.preventDefault();

        setError(null);
        setLoading(true);

        try{
            const response = await registerUser({
                username,
                password, 
                email,
                firstName,
                lastName,
            }).unwrap();
            console.log("token", response.token);
            const welcomeMessage = "Welcome to your Last Chance";
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
        <h1 className="register-heading"> Register </h1>
        <form className="register-form" onSubmit={attemptRegister}>
            <label className="register-username">Username</label>
            <input
            type = "text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
            <label className="register-password">Password</label>
            <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <label className="register-email">Email</label>
            <input
            type= "email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <label className="first-name">First Name</label>
            <input 
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            />
            <label className="last-name">Last Name</label>
            <input 
            type = "text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            />
            <button className="register-button">Register</button>
            {loading && <p>Registering!</p>}
            {error && (
                <p className="error-message">
                    Oops! Something went wrong during registration.
                </p>
            )}
        </form>
    </div>
    );
};

export default Register;