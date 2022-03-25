import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
const Personalform = (props) => {
	const [username, setUsername] = useState("");
	const [inputs, setInputs] = useState({
		first_name: "",
		last_name: "",
		pronoun: "",
		occupation: "",
		phone_number: "",
		city: "",
		state: "",
		zip: "",
	});
	const {
		first_name,
		last_name,
		pronoun,
		occupation,
		phone_number,
		city,
		state,
		zip,
	} = inputs;
	const onChange = (e) => {
		// take in every input and target the input value of name
		//like email,username, and password
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};

	const onSubmitForm = async (e) => {
		e.preventDefault();
		try {
			const body = {
				first_name,
				last_name,
				pronoun,
				occupation,
				phone_number,
				city,
				state,
				zip,
			};
			// console.log(user_id)
			const response = await fetch(
				`http://localhost:3005/pform/${props.user_id}`,
				{
					//http://localhost:3005/pform/
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						token: localStorage.token,
					},
					// headers: { token: localStorage.token },

					body: JSON.stringify(body),
				}
			);
			const parseRes = await response.json();
			setUsername(parseRes.username);

			if (parseRes.token) {
				// we want to save the token to our local storage
				localStorage.setItem("token", parseRes.token);
				console.log(parseRes);
				//now we want to setAuth to true
				props.setAuth(true);
				toast.success("submit succesfully"); // then use toastify
			} else {
				// if false
				props.setAuth(false); // set auth to false
				toast.error(parseRes); // set the toast to send and error
			}
		} catch (err) {
			console.error(err.message);
		}
       
	};

	const logout = (e) => {
		e.preventDefault();
		localStorage.removeItem("token");
		localStorage.removeItem("user_id");
		props.setAuth(false);
		toast.success("Logged out successfully");
	};

	

	return (
		<Fragment>
			{/* onSubmit={onSubmitForm} */}
			{username}
			<h1 className="text-center my-5">Intake Form</h1>
			<form onSubmit={onSubmitForm}>
				<input
					type="text"
					// this is a name of an input
					name="first_name"
					placeholder="first_name"
					className="form-control my-3"
					value={first_name}
					onChange={(e) => onChange(e)}
				/>
				<input
					type="text"
					name="last_name"
					placeholder="Last Name"
					className="form-control my-3"
					value={last_name}
					onChange={(e) => onChange(e)}
				/>
				<input
					type="text"
					name="pronoun"
					placeholder="pronoun"
					className="form-control my-3"
					value={pronoun}
					onChange={(e) => onChange(e)}
				/>
				<input
					type="text"
					name="occupation"
					placeholder="occupation"
					className="form-control my-3"
					value={occupation}
					onChange={(e) => onChange(e)}
				/>
				<input
					type="text"
					name="phone_number"
					placeholder="phone number"
					className="form-control my-3"
					value={phone_number}
					onChange={(e) => onChange(e)}
				/>
				<input
					type="text"
					name="city"
					placeholder="city"
					className="form-control my-3"
					value={city}
					onChange={(e) => onChange(e)}
				/>
				<input
					type="text"
					name="state"
					placeholder="state"
					className="form-control my-3"
					value={state}
					onChange={(e) => onChange(e)}
				/>
				<input
					type="text"
					name="zip"
					placeholder="zip"
					className="form-control my-3"
					value={zip}
					onChange={(e) => onChange(e)}
				/>
				<button
					type="submit"
					value="submit"
					className="btn btn-success btn-block"
					//onClick={(e) => redirect(e)}
				>
					Submit
				</button>
			</form>
			<button className="btn btn-primary" onClick={(e) => logout(e)}>
				logout
			</button>
		</Fragment>
	);
};
export default Personalform;

// import React, { Fragment, useState, useEffect } from "react";
// import { ToastContainer, toast } from 'react-toastify';
// import { NavbarData } from "./Navbar";
// const Personalform = ({ setAuth }) => {
// 	const [username, setUsername] = useState("");
// 	async function getusername() {
// 		try {
// 			const response = await fetch("http://localhost:3005/home/", {
// 				method: "GET",
// 				//pass the token and its in local storage
// 				headers: { token: localStorage.token },
// 			});
// 			const parseRes = await response.json();
// 			setUsername(parseRes.username);
// 		} catch (err) {
// 			console.error(err.message);
// 		}
// 	}

// 	const logout = (e) => {
// 		e.preventDefault();
// 		localStorage.removeItem("token");
// 		setAuth(false);
//         toast.success("Logged out successfully")
// 	};

// 	//now we are going to use effect
// 	useEffect(() => {
// 		//make a request
// 		getusername();
// 	},[]);

// 	return (
// 		<Fragment>
// 			<h1>Intake Form {username}</h1>
//             <h2>now please click on the intake form</h2>
// 			<button className="btn btn-primary" onClick={(e) => logout(e)}>
// 				Logout
// 			</button>

// 		</Fragment>
// 	);
// };
// export default Personalform;
