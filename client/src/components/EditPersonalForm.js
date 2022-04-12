import React, { useState, setShow } from "react";
import { Button, Form, Modal } from "react-bootstrap";

function EditPersonalForm(props) {
	console.log(props);
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleSubmit = async function (event) {
		console.log(event);
		event.preventDefault();
		const userId = props.personalForm.user_id;
		const firstName = event.target.form.elements.firstName.value;
		const lastName = event.target.form.elements.lastName.value;
		const occupation = event.target.form.elements.occupation.value;
		const phoneNumber = event.target.form.elements.phoneNumber.value;
		const pronoun = event.target.form.elements.pronoun.value;
		const state = event.target.form.elements.state.value;
		const city = event.target.form.elements.city.value;
		const zip = event.target.form.elements.zip.value;
		const body = {
			firstName,
			lastName,
			occupation,
			phoneNumber,
			pronoun,
			state,
			city,
			zip,
		};
		const response = await fetch(
			`http://localhost:4001/pform/update/${userId}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.token,
				},
				body: JSON.stringify(body),
			}
		);
		console.log(response);
	};
	return (
		<>
			<Button variant="outline-light" onClick={handleShow}>
				Update
			</Button>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Personal Information</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3">
							<Form.Label>First Name</Form.Label>
							<Form.Control
								name="firstName"
								defaultValue={props.personalForm.first_name}
								type="text"
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Last Name</Form.Label>
							<Form.Control
								name="lastName"
								defaultValue={props.personalForm.last_name}
								type="text"
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Occupation</Form.Label>
							<Form.Control
								name="occupation"
								defaultValue={props.personalForm.occupation}
								type="text"
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Phone Number</Form.Label>
							<Form.Control
								name="phoneNumber"
								defaultValue={props.personalForm.phone_number}
								type="text"
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Pronoun</Form.Label>
							<Form.Control
								name="pronoun"
								defaultValue={props.personalForm.pronoun}
								type="text"
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>State</Form.Label>
							<Form.Control
								name="state"
								defaultValue={props.personalForm.state}
								type="text"
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>City</Form.Label>
							<Form.Control
								name="city"
								defaultValue={props.personalForm.city}
								type="text"
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Zip</Form.Label>
							<Form.Control
								name="zip"
								defaultValue={props.personalForm.zip}
								type="text"
							/>
						</Form.Group>
						<Button variant="outline-light mr-2" onClick={handleSubmit}>
							Save Changes
						</Button>
						<Button variant="outline-light" onClick={handleClose}>
							Close
						</Button>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					{/* <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button> */}
					{/* <Button variant="primary" onClick={handleSubmit}>
                            Save Changes
                        </Button>
                         */}
				</Modal.Footer>
			</Modal>
		</>
	);
}
export default EditPersonalForm;
