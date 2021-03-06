import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./pagecss/personalform.css";
const PersonalForm = (props) => {
	console.log(props);
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
		console.log(inputs);
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
				`http://localhost:4001/pform/${props.user_id}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						token: localStorage.token,
					},
					body: JSON.stringify(body),
				}
			);
			const parseRes = await response.json();
			toast.success("succesfully submited personal form");
			setUsername(parseRes.username);
			if (parseRes.token) {
				// we want to save the token to our local storage
				localStorage.setItem("token", parseRes.token);
				console.log(parseRes);
				// toast.success("succesfully submited personal form");
				//now we want to setAuth to true
				// props.setAuth(true);
				// then use toastify
			} else {
				// if false
				// props.setAuth(false); // set auth to false
				toast.error(parseRes); // set the toast to send and error
			}
		} catch (err) {
			console.error(err.message);
		}
	};

	// useEffect(() => {
	// 	onSubmitForm();
	// });

	return (
		<Fragment>
			<form
				onSubmit={onSubmitForm}
				className="col-xs-2 mx-auto"
				id="personalform"
			>
				<h1 className="my-5">Personal Form</h1>
				<input
					type="text"
					// this is a name of an input
					name="first_name"
					placeholder="First Name..."
					className="form-control my-3"
					value={first_name}
					onChange={(e) => onChange(e)}
				/>
				<input
					type="text"
					name="last_name"
					placeholder="Last Name..."
					className="form-control my-3"
					value={last_name}
					onChange={(e) => onChange(e)}
				/>
				<input
					type="text"
					name="pronoun"
					placeholder="pronoun..."
					className="form-control my-3"
					value={pronoun}
					onChange={(e) => onChange(e)}
				/>
				<input
					type="text"
					name="occupation"
					placeholder="Occupation..."
					className="form-control my-3"
					value={occupation}
					onChange={(e) => onChange(e)}
				/>
				<input
					type="text"
					name="phone_number"
					placeholder="Phone Number..."
					className="form-control my-3"
					value={phone_number}
					onChange={(e) => onChange(e)}
				/>
				<input
					type="text"
					name="city"
					placeholder="City..."
					className="form-control my-3"
					value={city}
					onChange={(e) => onChange(e)}
				/>
				<input
					type="text"
					name="state"
					placeholder="State..."
					className="form-control my-3"
					value={state}
					onChange={(e) => onChange(e)}
				/>
				<input
					type="text"
					name="zip"
					placeholder="Zip..."
					className="form-control my-3"
					value={zip}
					onChange={(e) => onChange(e)}
				/>
				<button
					className="btn text-light "
					type="submit"
					value="submit"
					// onClick={(e) => redirect(e)}
				>
					Submit
				</button>
			</form>
		</Fragment>
	);
};
export default PersonalForm;
