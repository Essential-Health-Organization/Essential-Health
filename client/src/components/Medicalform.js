import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./pagecss/medicalform.css";
const MedicalForm = (props) => {
	const [username, setUsername] = useState("");
	const [inputs, setInputs] = useState({
		any_medication: "",
		medication_description: "",
		insurance: "",
	});

	//creating const objects
	const { any_medication, medication_description, insurance } = inputs;

	const onChange = (e) => {
		//takes in every input and target the input value of name like
		//email, username, and password
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};

	const onSubmitForm = async (e) => {
		e.preventDefault();
		console.log(inputs);
		try {
			const body = { any_medication, medication_description, insurance };

			const response = await fetch(
				`http://localhost:3005/mform/${props.user_id}`,
				{
					method: "POST",
					//pass token with localstorage because it is stored in the header
					// headers: { token: localStorage.token },
					headers: {
						"Content-Type": "application/json",
						token: localStorage.token,
					},
					body: JSON.stringify(body),
				}
			);

			const parseRes = await response.json();
			setUsername(parseRes.username);
			if (parseRes.token) {
				localStorage.setItem("token", parseRes.token);
				console.log(parseRes);
				props.setAuth(true);
			} else {
				props.setAuth(false);
				toast.error(parseRes);
			}
		} catch (err) {
			console.error(err.message);
		}
	};

	return (
		<Fragment>
			<form
				onSubmit={onSubmitForm}
				className="col-xs-2w-50 mx-auto"
				id="medicalform"
			>
				<h1>Medical Form</h1>
				<h5 className="mt-4">Are you using any medication?</h5>
				<label className="radio-inline ">
					<input
						className="ml-2"
						type="radio"
						name="any_medication"
						id="Radios1"
						value="Yes"
						onChange={(e) => onChange(e)}
					/>
					Yes
					<input
						className="ml-2"
						type="radio"
						name="any_medication"
						id="Radios2"
						value="No"
						onChange={(e) => onChange(e)}
					/>
					No
				</label>
				<h5 className="mt-2">What type of medication?</h5>
				<input
					type="text"
					name="medication_description"
					placeholder="Medication Type ..."
					className="form-control my-3"
					value={medication_description}
					onChange={(e) => onChange(e)}
				/>
				<h5 className="mt-2">Please name your insurance</h5>
				<input
					type="text"
					name="insurance"
					placeholder="Insurance..."
					className="form-control my-3"
					value={insurance}
					onChange={(e) => onChange(e)}
				/>
				<button className="btn text-white" type="submit" value="submit">
					Submit
				</button>
			</form>
		</Fragment>
	);
};
export default MedicalForm;
