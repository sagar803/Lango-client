import React, { useState } from 'react'
import './Auth.css'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';


export const Auth = ({isAuth, setIsAuth, setUser}) => {
    const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(false);
    const [pageType, setPageType] = useState("login");
    const [credentials , setCredentials ] = useState({fullName : '', email : '' , password : ''});
    const [formErrors, setFormErrors] = useState({});
    
    const togglePageType = () => {
        setCredentials({fullName : '', email : '' , password : ''});
        setFormErrors({})
        if (pageType === "login") setPageType("register");
        else setPageType("login");
    }

    // Validation schema for the registration form
    const registrationSchema = Yup.object().shape({
        fullName: Yup.string()
           .required('Name is equired'),
        email: Yup.string()
          .email('Invalid email address')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
    });
      
    // Validation schema for the login form
    const loginSchema = Yup.object().shape({
        email: Yup.string()
          .email('Invalid email address')
          .required('Email is required'),
        password: Yup.string()
          .required('Password is required'),
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(pageType === 'login'){
                await loginSchema.validate(credentials, { abortEarly: false });
            }
            else {
                await registrationSchema.validate(credentials, { abortEarly: false });
            }
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
                setUser(data.user);
//                localStorage.setItem("token" , data.token);
//                localStorage.setItem("user" , data.user.fullName);
                setIsAuth(true);
                navigate('/setup');
            }
        } catch (error) {
            console.log(error);
            if (error.inner) {
                // Validation failed, update the formErrors state with the error messages
                const errors = {};
                error.inner.forEach((e) => {
                  errors[e.path] = e.message;
                });
                setFormErrors(errors);
            }
        } finally{
            setLoading(false)
        }
    }
  return (
      <div className="auth-body">
        <div className='auth-form-container'>
            <h1 className='welcome'>Welcome to Lango</h1>        
            <form
                className='auth-form' 
                onSubmit={handleSubmit}
            >
            {    
                (pageType === "register") && (
                    <>
                    {formErrors.fullName && <div className="error">{formErrors.fullName}</div>}
                    <input 
                    value={credentials.fullName}
                    onChange={(e) => setCredentials({ ...credentials, fullName: e.target.value })}
                    type='text' 
                    placeholder="Enter you name.." 
                    />    
                    </>
                )
            }
                {formErrors.email && <div className="error">{formErrors.email}</div>}
                <input 
                    value={credentials.email}
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                    type='text' 
                    placeholder="Email" 
                />
                 {formErrors.password && <div className="error">{formErrors.password}</div>}
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
                <p
                    className='toggle-page'
                    onClick={togglePageType}
                >{(pageType === "login") ? "Register here" : "Login here"}</p>
            </form>

      </div>
    </div>
  )
}
