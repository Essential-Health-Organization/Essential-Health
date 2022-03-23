import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";

import { encryptStorage } from "./encrypt";
const Home = ({ setAuth }) => {
	const [username, setUsername] = useState("");
	const [user_id, setuserid] = useState("");
	// const [personalForm, setpersonalForm] = useState([]);//
	// const [Pform, setform] = useState(false);
	async function getUsername() {
		try {
			const response = await fetch("http://localhost:4001/home/", {
				method: "GET",
				//pass token with localstorage because it is stored in the header
				headers: { token: localStorage.token },
			});

			const parseRes = await response.json();
			// setpersonalForm(parseData);
			setUsername(parseRes.username);
			setuserid(parseRes.user_id); //
			// const encryptStorage = new EncryptStorage('secret-key');
			encryptStorage.setItem("user_id", parseRes.user_id);
			console.log(parseRes);
		} catch (err) {
			console.error(err.message);
		}
	}

	//going to make a request when we get to this component, this is for getting from database
	useEffect(() => {
		getUsername();
	}, []);

	return (
		<Fragment>
			<h1>Home {username}</h1>
			<h1>user id:{user_id}</h1>
		</Fragment>
	);
};

export default Home;
