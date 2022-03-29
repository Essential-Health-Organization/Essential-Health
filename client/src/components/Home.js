import React, { Fragment, useState, useEffect } from "react";
//import { toast } from "react-toastify";
import "./pagecss/home.css";
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
			<div className="text-light" id="home">
				<h2>Welcome,{username}</h2>
				<h3>
					There are a lot of people in this world that do not recieve the right
					help. Essential Health is designed to help improve your mental health
					by matching you to the best therapist based on you occupation. We are
					consistantly providing as much resources as possible to help improve
					your mental health. Also you are able to look at the reviews of the
					clinic and pick the desired one based on the clinic, as well as give a
					review.
				</h3>
			</div>
		</Fragment>
	);
};

export default Home;
