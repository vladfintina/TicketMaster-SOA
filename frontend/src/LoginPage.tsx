import { ChangeEvent, useState, KeyboardEvent } from "react";
import { useAuth } from "./AuthContext.tsx";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = useAuth();
    const navigate = useNavigate();

    const handleChange = (event: ChangeEvent<HTMLInputElement>, setter: (value: string) => void) => {
        setter(event.target.value);
    };

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        fetch("http://localhost/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Invalid credentials");
            })
            .then(data => {
                auth.setToken(data.token);
                auth.setIsAuthenticated(true);
                navigate("/");
            })
            .catch((error) => {
                console.error(error);
                alert(error.message);
            });
    };

    return (
        <div className="card">
            <h2>Login</h2>
            <label htmlFor="emailInput">Email:</label>
            <input
                type="email"
                id="emailInput"
                value={email}
                onChange={(e) => handleChange(e, setEmail)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your email..."
            />
            <br/><br/>
            <label htmlFor="passwordInput">Password:</label>
            <input
                type="password"
                id="passwordInput"
                value={password}
                onChange={(e) => handleChange(e, setPassword)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your password..."
            />
            <br/><br/>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default LoginPage;
