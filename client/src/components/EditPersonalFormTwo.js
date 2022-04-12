import React, { Fragment, useState } from "react";

//we want to send in a prop
const EditPersonalForm = (props) => {
	const [updatePform, setupdatePform] = useState([props.personalForm]);
	console.log(props.personalForm);
	console.log("this is the form ", {updatePform});
	//now we are going to create an edit function that will send the data to the backend
	
	const updatePersonalForm = async (e) => {
		// e.preventDefault();
	

		try {
			//console.log("this is the props", props.personalForm);
			const body = { updatePform };
			console.log("this is in the try ",updatePform)
			const response = await fetch(
				`http://localhost:3005/pform/update/${updatePform[0].user_id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						token: localStorage.token,
					},
					body: JSON.stringify(body),
				}
			);
			// const parseRes = await response.json();
			// //console.log(parseRes);
			// //setupdatePform(parseRes)
			// // window.location = "/home";
		} catch (err) {
			console.error(err.message);
		}
	};
	//  console.log({updatePform});
	//  console.log(updatePform[0].first_name)
	//console.log(updatePform.first_name)
	return (
		<Fragment>
			{/* <!-- Button trigger modal --> */}
			<button
				type="button"
				className="btn btn-primary"
				data-toggle="modal"
				data-target={`id${updatePform[0].user_id}`}
				 onClick={(e) => updatePersonalForm(updatePform[0].user_id)}
			>
				Launch demo modal
			</button>

			{/* <!-- Modal --> */}
			<div
				className="modal fade"
				id={`id${updatePform[0].user_id}`}
				tabIndex="-1"
				role="dialog"
				// aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id={`id${updatePform[0].user_id}`}>
								Modal title
							</h5>
							<button
								type="button"
								className="close"
								data-dismiss="modal"
								onClick={(e) => setupdatePform(props.personalForm)}
								
								aria-label="Close"
							>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<input
								type="text"
								name="first_name"
								className="form-control"
								value={updatePform[0].first_name}
								onChange={(e) => setupdatePform(e.target.value)}
							/>
							<input
								type="text"
								name="last_name"
								className="form-control"
								value={updatePform[0].last_name}
								onChange={(e) => setupdatePform(e.target.value)}
							/>
							<input
								type="text"
								name="occupation"
								className="form-control"
								value={updatePform[0].occupation}
								onChange={(e) => setupdatePform(e.target.value)}
							/>
							<input
								type="text"
								name="phone_number"
								className="form-control"
								value={updatePform[0].phone_number}
								onChange={(e) => setupdatePform(e.target.value)}
							/>
							<input
								type="text"
								name="pronoun"
								className="form-control"
								value={updatePform[0].pronoun}
								onChange={(e) => setupdatePform(e.target.value)}
							/>
							<input
								type="text"
								name="state"
								className="form-control"
								value={updatePform[0].state}
								onChange={(e) => setupdatePform(e.target.value)}
							/>
							<input
								type="text"
								name="city"
								className="form-control"
								value={updatePform[0].city}
								onChange={(e) => setupdatePform(e.target.value)}
							/>
							<input
								type="text"
								name="zip"
								className="form-control"
								value={updatePform[0].zip}
								onChange={(e) => setupdatePform(e.target.value)}
							/>
						</div>
						<div className="modal-footer">
							
							<button
								type="button"
								className="btn btn-secondary"
								data-dismiss="modal"
							>
								Close
							</button>
							<button type="button" className="btn btn-primary">
								Save changes
							</button>
						</div>
					</div>
				</div>
			</div>
			{/* <button
				type="button"
				className="btn btn-warning"
				data-dismiss="modal"
				onClick={(e) => updatePersonalForm(updatePform.user_id)}
			>
				Edit
			</button>  */}
			{/* <button
				type="button"
				className="btn btn-warning"
				data-dismiss="modal"
				onClick={(e) => updatePersonalForm(updatePform.user_id)}
			>
				Edit
			</button> 
			
			
				<button
				type="button"
				className="btn btn-warning"
				data-toggle="modal"
				data-target={`#id${updatePform[0].user_id}`}
			>
				Edit
			</button>

			<div className="modal" id={`id${updatePform[0].user_id}`}>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h4 className="modal-title">Edit Anime</h4>
							<button
								type="button"
								className="close"
								data-dismiss="modal"
								onClick={() => setupdatePform(updatePform[0])}
							>
								&times;
							</button>
						</div>
						<div className="modal-body">
							<input
								type="text"
								className="form-control"
								value={updatePform[0].first_name}
								onChange={(e) => setupdatePform(e.target.value)}
							/>
							<input
								type="text"
								className="form-control"
								value={updatePform[0].last_name}
								onChange={(e) => setupdatePform(e.target.value)}
							/>
							<input
								type="text"
								className="form-control"
								value={updatePform[0].occupation}
								onChange={(e) => setupdatePform(e.target.value)}
							/>
							<input
								type="text"
								className="form-control"
								value={updatePform[0].phone_number}
								onChange={(e) => setupdatePform(e.target.value)}
							/>
							<input
								type="text"
								className="form-control"
								value={updatePform[0].pronoun}
								onChange={(e) => setupdatePform(e.target.value)}
							/>
							<input
								type="text"
								className="form-control"
								value={updatePform[0].state}
								onChange={(e) => setupdatePform(e.target.value)}
							/>
							<input
								type="text"
								className="form-control"
								value={updatePform[0].city}
								onChange={(e) => setupdatePform(e.target.value)}
							/>
							<input
								type="text"
								className="form-control"
								value={updatePform[0].zip}
								onChange={(e) => setupdatePform(e.target.value)}
							/>
							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-warning"
									data-dismiss="modal"
									onClick={(e) => updatePersonalForm(updatePform.user_id)}
								>
									Edit
								</button>

								<button
									type="button"
									className="btn btn-danger"
									data-dismiss="modal"
								>
									Close
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			
			
			
			
			*/}
		</Fragment>
	);
};

export default EditPersonalForm;
