import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "./navbar";
const Medicalform = (props) => {
	const [username, setUsername] = useState("");

	const [inputs, setInputs] = useState({
		any_medication: "",
		medication_description: "",
		insurance: "",
	});
	const { any_medication, medication_description, insurance } = inputs;
	const onChange = (e) => {
		// take in every input and target the input value of name
		//like email,username, and password
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};

	const onSubmitForm = async (e) => {
		e.preventDefault();
		try {
			const body = {
				any_medication,
				medication_description,
				insurance,
			};
			// console.log(user_id)
			const response = await fetch(
				`http://localhost:3005/mform/${props.user_id}`,
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
	// useEffect(() => {
	// 	//make a request
	// 	onSubmitForm();
	// },[]);
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
					name="any_medication"
					placeholder="any_medication"
					className="form-control my-3"
					value={any_medication}
					onChange={(e) => onChange(e)}
				/>
				<input
					type="text"
					name="medication_description"
					placeholder="medication_description"
					className="form-control my-3"
					value={medication_description}
					onChange={(e) => onChange(e)}
				/>
				<input
					type="text"
					name="insurance"
					placeholder="insurance"
					className="form-control my-3"
					value={insurance}
					onChange={(e) => onChange(e)}
				/>

				{/* <button className="btn btn-success btn-block">Submit</button> */}
				<button
					type="submit"
					value="submit"
					className="btn btn-success btn-block"
                    //onClick={(e) =>redirect(e)}
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
export default Medicalform;
