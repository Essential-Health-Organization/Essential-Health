import React, { useState, setShow } from "react";
import { Button, Form, Modal } from "react-bootstrap";
function EditMForm(props) {
	console.log(props);
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleSubmit = async function (event) {
		console.log(event);
		event.preventDefault();
		const userId = props.MedicalForm.user_id;
		const any_medication = event.target.form.elements.any_medication.value;
		const medication_description =
			event.target.form.elements.medication_description.value;
		const insurance = event.target.form.elements.insurance.value;
		// const phoneNumber = event.target.form.elements.phoneNumber.value;
		const body = { any_medication, medication_description, insurance };
		const response = await fetch(
			`http://localhost:4001/MForm/update/${userId}`,
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
					<Modal.Title>Medical Information</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3">
							<Form.Label>Any Medication</Form.Label>
							<Form.Control
								name="any_medication"
								defaultValue={props.MedicalForm.any_medication}
								type="text"
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Medication Description</Form.Label>
							<Form.Control
								name="medication_description"
								defaultValue={props.MedicalForm.medication_description}
								type="text"
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Insurance</Form.Label>
							<Form.Control
								name="insurance"
								defaultValue={props.MedicalForm.insurance}
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
export default EditMForm;
