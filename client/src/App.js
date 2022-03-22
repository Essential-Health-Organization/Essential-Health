import React, { Fragment, useState, useEffect } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Personalform from "./components/Personalform";
import Navbar from "./components/navbar";
import {encryptStorage } from "../src/components/encrypt";
import Medicalform from "./components/Medicalform"
toast.configure();

function App(props) {
	const [username, setUsername] = useState("");
	const [user_id, setuserid] = useState("");
	// we want to make sure it set to false first
	const [isAuthenticated, setAuthenticated] = useState(false);

	//this is going to the be toggle function to set the auth
	const setAuth = (Boolean) => {
		setAuthenticated(Boolean); //this will change the state
	};
	//this is going to check if the use is authenticated even if you refresh the page
	async function isAuth() {
		try {
			//check if the user is still validated
			const response = await fetch("http://localhost:3005/auth/is-verify", {
				method: "GET",
				headers: { token: localStorage.token },
			});
			const parseRes = await response.json();

			console.log(parseRes);
			//saying if parse is true setauth to true else set to false
			parseRes === true ? setAuthenticated(true) : setAuthenticated(false);
		} catch (err) {
			console.error(err.message);
		}
	}
	
	useEffect(() => {
		isAuth();
    const storedUserID = encryptStorage.getItem("user_id");
    //const value = encryptStorage.decryptString(storedUserID);
		setuserid(storedUserID); //
		console.log(storedUserID);
	},[]);
	return (
		<Fragment>
			<Router>
				<Navbar setAuth={setAuth} />
				{/* reason why we use render instead of component props is because
                              anytime we send props to a component we don't want it to remount /} 

                              !isAuthenticated ?
                              (<Route exact path="/login">
                              <Login/>
                              </Route>)
                              :
                              (<Route exact path="/login">
                              <Link to="/home"/>
                              </Route>)

                              */}
				<div className="container">
					<Routes>
						<Route
							exact
							path="/login"
							element={
								!isAuthenticated ? (
									<Login setAuth={setAuth} />
								) : (
									<Navigate to="/home" />
								)
							}
						/>
						<Route
							exact
							path="/register"
							element={
								!isAuthenticated ? (
									<Register setAuth={setAuth} />
								) : (
									<Navigate to="/home" />
								)
							}
						/>
						<Route
							exact
							path="/home"
							element={
								isAuthenticated ? (
									<Home setAuth={setAuth} />
								) : (
									<Navigate to="/login" />
								)
							}
						/>
						<Route
							exact
							path="/pform"
							element={
								isAuthenticated ? (
									<Personalform setAuth={setAuth} user_id={user_id} />
								) : (
									<Navigate to="/home" />
								)
							}
						/>
            	<Route
							exact
							path="/mform"
							element={
								isAuthenticated ? (
									<Medicalform setAuth={setAuth} user_id={user_id} />
								) : (
									<Navigate to="/home" />
								)
							}
						/>
						{/* <Route exact path="/pfrom" element={<Personalform/>}/> */}
						{/* {/ <Route exact path="/home" element={props => <Home {...props} />} /> */}
					</Routes>
				</div>
			</Router>
		</Fragment>
	);
}

export default App;
