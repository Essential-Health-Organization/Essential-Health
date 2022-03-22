import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const Register = ({ setAuth }) => {
	const [inputs, setInputs] = useState({
		email: "",
		password: "",
		username: "",
	});
	const { email, password, username } = inputs;
	const onChange = (e) => {
		// take in every input and target the input value of name
		//like email,username, and password
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};
	// when we submit we dont want the page to refresh
	const onSubmitForm = async (e) => {
		e.preventDefault();
		try {
			const body = { email, password, username };
			const response = await fetch("http://localhost:3005/auth/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});
			const parseRes = await response.json();
			if (parseRes.token) {
				// we want to save the token to our local storage
				localStorage.setItem("token", parseRes.token);
				// console.log(parseRes);
				//now we want to setAuth to true
				setAuth(true);
				toast.success("Register Successfully"); // then use toastify
			} else {
				// if false
				setAuth(false); // set auth to false
				toast.error(parseRes); // set the toast to send and error
			}
		} catch (err) {
			console.error(err.message);
		}
	};
	return (
		<Fragment>
			<h1 className="text-center my-5">Register</h1>
			<form onSubmit={onSubmitForm}>
				<input
					type="email"
					// this is a name of an input
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
				<input
					type="text"
					name="username"
					placeholder="username"
					className="form-control my-3"
					value={username}
					onChange={(e) => onChange(e)}
				/>
				<button className="btn btn-success btn-block">Submit</button>
			</form>
			<Link to="/login">Login</Link>
		</Fragment>
	);
};
export default Register;
