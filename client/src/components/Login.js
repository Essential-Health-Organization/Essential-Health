import React, { Fragment, useState } from "react";
import {Link} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import Messages from "./Messages";
const Login = ({ setAuth }) => {
    // destination = setAuth
    // console.log(destination)
	const [inputs, setInputs] = useState({
		email: "",
		password: "",
	});
	const { email, password } = inputs;

    const onChange = (e) =>{
        setInputs({...inputs, [e.target.name]: e.target.value})
    };
const onSubmitForm = async(e) =>{
    e.preventDefault()

    try {
       const body = {email,password}
       const response = await fetch("http://localhost:3005/auth/login",{
           method:"POST",
           headers:{"Content-Type":"application/json"},
           body: JSON.stringify(body)
       }) 
       const parseRes = await response.json()
       //here we are using toast and if true do this 
       console.log(parseRes)
       if(parseRes.token){// we have token 
        localStorage.setItem("token",parseRes.token)// set it to local storage
        // localStorage.setItem("user_id",parseRes.user_id)
        setAuth(true)// set the authintication to true 
        toast.success("login successfully!")// then use toastify
       }else{// if false
           setAuth(false)// set auth to false
           toast.error(parseRes)// set the toast to send and error
       }
      

    } catch (err) {
        console.error(err.message)
    }

}
	return (
		<Fragment>
            <Messages/>
			<h1 className="text-center my-5">Login</h1>
			<form onSubmit={onSubmitForm}>
				<input
					type="email"
					name="email"
					placeholder="email"
					className="form-control my-3"
                    value={email}
                    onChange={(e) => onChange(e)}
				/>
				<input
					type="password"
					name="password"
					placeholder="password"
					className="form-control my-3"
                    value={password}
                    onChange={(e) => onChange(e)}
				/>
				<button className="btn btn-success btn-block">submit</button>
			</form>
           <Link to="/register">Regiter</Link>  {/* if the person does not have an account do this */}
		</Fragment>
	);
};
export default Login;
