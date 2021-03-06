import React, { Fragment, useState, useEffect } from "react";
import "./pagecss/messages.css";
const Message = () => {
	const [insperational_message, setinsperational_message] = useState("");
	const [insperational_message_id, setinsperational_message_id] = useState("");
	// async function getMessage() {

	const handleClick = async () => {
		const newID = Math.floor(1 + Math.random() * (5 - 0));
		console.log(newID);

		try {
			const response = await fetch(`http://localhost:4001/message/${newID}`, {
				method: "GET",
				// headers: { "Content-Type": "application/json" },
			});
			console.log(response.status);
			const parseRes = await response.json();
			console.log(parseRes);
			setinsperational_message_id(
				parseRes.data.message.insperational_message_id
			);
			setinsperational_message(parseRes.data.message.insperational_message);
			console.log(insperational_message);

			//console.log(parseRes);
		} catch (err) {
			console.error(err.message);
		}
	};

	//going to make a request when we get to this component, this is for getting from database
	useEffect(() => {}, []);

	return (
		<Fragment>
			<div className="fluid-container " id="messages">
				<h2>Not feeling like yourself</h2>
				<button
					className="btn text-light  mt-3 mb-3"
					onClick={() => handleClick()}
				>
					Click Me!
				</button>
				<h3>{insperational_message}</h3>
			</div>
		</Fragment>
	);
};

export default Message;
