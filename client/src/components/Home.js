import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";

const Home = ({ setAuth }) => {
	const [username, setUsername] = useState("");
	async function getUsername() {
		try {
			const response = await fetch("http://localhost:4001/home/", {
				method: "GET",
				//pass token with localstorage because it is stored in the header
				headers: { token: localStorage.token },
			});

			const parseRes = await response.json();
			setUsername(parseRes.username);
		} catch (err) {
			console.error(err.message);
		}
	}

	const logout = (e) => {
		e.preventDefault();
		localStorage.removeItem("token");
		setAuth(false);
		toast.success("Logged out Successfully!");
	};

	//going to make a request when we get to this component, this is for getting from database
	useEffect(() => {
		getUsername();
	}, []);

	return (
		<Fragment>
			<h1>Home {username}</h1>
			<button className="btn btn-primary" onClick={(e) => logout(e)}>
				logout
			</button>
		</Fragment>
	);
};

export default Home;
