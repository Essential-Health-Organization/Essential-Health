import React, { Fragment, useState, useEffect } from "react";
import EditPersonalForm from "./EditPersonalForm";
import { toast } from "react-toastify";
import EditMForm from "./EditMForm";
const ListPersonalForm = (props) => {
	// const [insperational_message, setinsperational_message] = useState("");
	// const [insperational_message_id, setinsperational_message_id] = useState("");
	const [personalForm, setPersonalForm] = useState([]);
	const [MedicalForm, setMedicalForm] = useState([]);
	const getForm = async () => {
		try {
			// console.log(props)
			const response = await fetch(
				`http://localhost:4001/pform/getting/${props.user_id}`,
				{
					headers: {
						token: localStorage.token,
					},
				}
			);
			///console.log(response.status);
			const parseRes = await response.json();
			console.log(parseRes);
			//console.log(parseRes.data.personal_information);
			setPersonalForm(parseRes.data.personal_information);
		} catch (err) {
			console.error(err.message);
		}
	};
	//console.log(personalForm);
	const getMForm = async () => {
		try {
			// console.log(props)
			const response = await fetch(
				`http://localhost:4001/mform/getting/${props.user_id}`,
				{
					headers: {
						token: localStorage.token,
					},
				}
			);
			///console.log(response.status);
			const parseRes = await response.json();
			console.log(parseRes);
			//console.log(parseRes.data.personal_information);
			setMedicalForm(parseRes.data.medical_information);
			console.log(parseRes);
		} catch (err) {
			console.error(err.message);
		}
	};
	//going to make a request when we get to this component, this is for getting from database
	useEffect(() => {
		getForm();
		getMForm();
	}, []);
	return (
		<Fragment>
			<div className="row my-5">
				<div className="col ">
					<table className="table table-light text-dark text-center w-75 rounded">
						<tr key={personalForm.user_id}>
							<tr>
								<th scope="col">First Name</th>
								<td>{personalForm.first_name}</td>
							</tr>
							<tr>
								<th scope="col">Last Name</th>
								<td>{personalForm.last_name}</td>
							</tr>
							<tr>
								<th scope="col">Pronoun</th>
								<td>{personalForm.pronoun}</td>
							</tr>
							<tr>
								<th scope="col">Occupation</th>
								<td>{personalForm.occupation}</td>
							</tr>
							<tr>
								<th scope="col">Phone Number</th>
								<td>{personalForm.phone_number}</td>
							</tr>
							<tr>
								<th scope="col">City</th>
								<td>{personalForm.city}</td>
							</tr>
							<tr>
								<th scope="col">State</th>
								<td>{personalForm.state}</td>
							</tr>
							<tr>
								<th scope="col">Zip</th>
								<td>{personalForm.state}</td>
							</tr>
							<tr>
								<th scope="col">Edit</th>
								<td>
									<EditPersonalForm personalForm={personalForm} />
								</td>
							</tr>
						</tr>
					</table>
				</div>
				<div className="col ">
					<table className="table table-light text-dark w-75 rounded">
						<tr key={MedicalForm.user_id}>
							<tr>
								<th scope="col">Any Medication</th>
								<td>{MedicalForm.any_medication}</td>
							</tr>
							<tr>
								<th scope="col">Medication Description</th>
								<td>{MedicalForm.medication_description}</td>
							</tr>
							<tr>
								<th scope="col">Insurance</th>
								<td>{MedicalForm.insurance}</td>
							</tr>
							<tr>
								<th scope="col">Edit</th>
								<td>
									<EditMForm MedicalForm={MedicalForm} />
								</td>
							</tr>
						</tr>
					</table>
				</div>
			</div>
		</Fragment>
	);
};
export default ListPersonalForm;

// <table className="table mt-5 text-center text-white">
// 				<thead>
// 					<tr>
// 						<th>first_name</th>
// 						<th>last_name</th>
// 						<th>pronoun</th>
// 						<th>occupation</th>
// 						<th>phone_number</th>
// 						<th>city</th>
// 						<th>state</th>
// 						<th>zip</th>
// 						<th>Edit</th>
// 					</tr>
// 				</thead>
// 				<tbody>
// 					{/*     <tr>
//                         <td>John</td>
//                         <td>Doe</td>
//                         <td>john@example.com</td>
//                     </tr>*/}
// 					<tr key={personalForm.user_id}>
// 						<td>{personalForm.first_name}</td>
// 						<td>{personalForm.last_name}</td>
// 						<td>{personalForm.pronoun}</td>
// 						<td>{personalForm.occupation}</td>
// 						<td>{personalForm.phone_number}</td>
// 						<td>{personalForm.city}</td>
// 						<td>{personalForm.state}</td>
// 						<td>{personalForm.zip}</td>
// 						<td>
// 							<EditPersonalForm personalForm={personalForm} />
// 						</td>
// 						{/* <td><Editanime anime ={anime} /></td> */}
// 						<td>
// 							{/* <button
//                                     className="btn btn-danger"
//                                     // onClick={() => deleteAnime(anime.anime_id)}
//                                 >
//                                     Delete
//                                 </button> */}
// 						</td>
// 					</tr>
// 				</tbody>
// 			</table>
// 			<table className="table mt-5 text-center text-white">
// 				<thead>
// 					<tr>
// 						<th>any_medication</th>
// 						<th>medical_description</th>
// 						<th>insurance</th>
// 						<th>Edit</th>
// 					</tr>
// 				</thead>
// 				<tbody>
// 					{/*     <tr>
//                         <td>John</td>
//                         <td>Doe</td>
//                         <td>john@example.com</td>
//                     </tr>*/}
// 					<tr key={MedicalForm.user_id}>
// 						<td>{MedicalForm.any_medication}</td>
// 						<td>{MedicalForm.medication_description}</td>
// 						<td>{MedicalForm.insurance}</td>
// 						<td>
// 							<EditMForm MedicalForm={MedicalForm} />
// 						</td>
// 						{/* <td><Editanime anime ={anime} /></td> */}
// 						<td>
// 							{/* <button
//                                     className="btn btn-danger"
//                                     // onClick={() => deleteAnime(anime.anime_id)}
//                                 >
//                                     Delete
//                                 </button> */}
// 						</td>
// 					</tr>
// 				</tbody>
// 			</table>
