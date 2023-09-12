import React, { useState } from 'react'
import './Auth.css'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';


export const Auth = ({isAuth, setIsAuth}) => {
    const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(false);
    const [pageType, setPageType] = useState("login");
    const [credentials , setCredentials ] = useState({fullName : '', email : '' , password : ''});

    const togglePageType = () => {
        if (pageType === "login") setPageType("register");
        else setPageType("login");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch(`${process.env.REACT_APP_API}/auth/${pageType}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            }) 
            if (res.ok){
                const data = await res.json();
                localStorage.setItem("token" , data.token);
                localStorage.setItem("userId" , data.user._id);
                localStorage.setItem("user" , data.user.fullName);
                setIsAuth(true);
                navigate('/');
            }
        } catch (error) {
            console.log(error)
        } finally{
            setLoading(false)
        }
    }
  return (
      <div className="auth-body">
        <div className='auth-form-container'>
            <h1>{pageType === "register" ? "Sign Up" : "Sign In"}</h1>        
            <form
                className='auth-form' 
                onSubmit={handleSubmit}>
            {
                (pageType === "register") && (
                    <input 
                    value={credentials.fullName}
                    onChange={(e) => setCredentials({ ...credentials, fullName: e.target.value })}
                    type='text' 
                    placeholder="Enter you name.." 
                />    
                )
            }
                <input 
                    value={credentials.email}
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                    type='text' 
                    placeholder="Email" 
                />
                <input 
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} 
                    type='password' 
                    placeholder="Password" 
                    />
                <button 
                    type='submit'
                    onClick={handleSubmit}
                >
                    {(pageType === "login") ? "Login" : "Register"}
                </button>
            </form>
            <p
                className='toggle-page'
                onClick={togglePageType}
            >{(pageType === "login") ? "Register here" : "Login here"}</p>

      </div>
    </div>
  )
}
