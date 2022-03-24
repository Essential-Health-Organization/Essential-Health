import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
//import Personalform from "./Personalform";
import {encryptStorage } from "./encrypt";
// import Navbar from "./navbar";
const Home = ({ setAuth }) => {
	const [username, setUsername] = useState("");
	const [user_id, setuserid] = useState("");
	// const [personalForm, setpersonalForm] = useState([]);//
	// const [Pform, setform] = useState(false);
	async function getUsername() {
		try {
			const response = await fetch("http://localhost:3005/home/", {
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

	const logout = (e) => {
		e.preventDefault();
		localStorage.removeItem("token");
		setAuth(false);
		toast.success("Logged out Successfully!");
	};

	//going to make a request when we get to this component, this is for getting from database
	useEffect(() => {
		getUsername();
	},[]);

	return (
		<Fragment>
			
			<h1>Home {username}</h1>
			<h1>{user_id}</h1>

			{/* <Personalform  setAuth={setAuth} user_id={user_id}/> */}

			<button className="btn btn-primary" onClick={(e) => logout(e)}>
				logout
			</button>
		</Fragment>
	);
};

export default Home;

// import React, { Fragment, useState, useEffect } from "react";
// import { ToastContainer, toast } from 'react-toastify';
// import { NavbarData } from "./Navbar";
// const Home = ({ setAuth }) => {
// 	const [username, setUsername] = useState("");
// 	const [user_id,set_user_id] = useState("")
// 	async function getusername() {
// 		try {
// 			const response = await fetch("http://localhost:3005/home/", {
// 				method: "GET",
// 				//pass the token and its in local storage
// 				headers: { token: localStorage.token },//
// 			});
// 			const parseRes = await response.json();
// 			setUsername(parseRes[0].username);//
// 			set_user_id(parseRes[0].user_id);//
// 		} catch (err) {
// 			console.error(err.message);
// 		}
// 	}

// 	const logout = (e) => {
// 		e.preventDefault();
// 		localStorage.removeItem("token");
// 		setAuth(false);
//         toast.success("Logged out successfully")
// 	};

// 	//now we are going to use effect
// 	useEffect(() => {
// 		//make a request
// 		getusername();
// 	},[]);

// 	return (
// 		<Fragment>
// 			<h1>Home {username}</h1>
// 			<h1>{user_id}</h1>

// 			<button className="btn btn-primary" onClick={(e) => logout(e)}>
// 				Logout
// 			</button>

// 		</Fragment>
// 	);
// };
// export default Home;
