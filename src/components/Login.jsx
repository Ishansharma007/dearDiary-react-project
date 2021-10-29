import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import alertContext from "../context/alerts/alertContext";

const Login = () => {
    const context = useContext(alertContext);
    const { showAlert } = context;

    const [credentials, setCredentials] = useState({ userName: "", password: "" });
    let history = useHistory();

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8000/api/auth/login", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName: credentials.userName, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success === true) {
            localStorage.setItem('token', json.token)
            showAlert("Login successfull", "success");
            history.push("/");
            

        }else {
            showAlert("Invalid credentials", "danger");
        }
    }

    return (
        <div className="container my-4">
            <h3 className="text-center">Login</h3>
            <form onSubmit={handleSubmit} className="container my-1">
                <div className="mb-3 ">
                    <label htmlFor="userName" className="form-label">Username</label>
                    <input type="text" value={credentials.userName} onChange={onChange} name="userName" className="form-control" id="userName" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" value={credentials.password} onChange={onChange} name="password" className="form-control" id="password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
