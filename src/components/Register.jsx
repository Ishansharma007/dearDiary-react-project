import React,{useState,useContext} from 'react';
import { useHistory } from 'react-router-dom';
import alertContext from '../context/alerts/alertContext';

const Register = () => {

    const context = useContext(alertContext);
    const {showAlert} = context;
    
    const [credentials, setCredentials] = useState({name: "", email: "", userName: "", password: "", cpassword: "" });
    let history = useHistory();
    
    const {name, email, userName, password, cpassword} = credentials ;

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await fetch("http://localhost:8000/api/auth/register" , {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({name, email, userName, password})
        });
        const json = await response.json();
        console.log(json);
        if(json.success === true){
            localStorage.setItem('token', json.token)
            history.push("/");
            showAlert("Successfully registered user", "success");
            
        }else{
            showAlert("Invalid credentials", "danger");
        }
    }

    return (
        <div className="container my-4">
        <h3 className="text-center">Create Account</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" value={name} onChange={onChange} name="name" className="form-control" id="name"  />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="text" value={email} onChange={onChange} name="email" className="form-control" id="email"  />
                </div>
                <div className="mb-3">
                    <label htmlFor="userName" className="form-label">Username</label>
                    <input type="text" value={userName} onChange={onChange} name="userName" className="form-control" id="userName"  />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" value={password} onChange={onChange} name="password" className="form-control" id="password"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm password</label>
                    <input type="password" value={cpassword} onChange={onChange} name="cpassword" className="form-control" id="cpassword"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Register
