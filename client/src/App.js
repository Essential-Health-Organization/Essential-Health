import React, { Fragment, useState, useEffect } from "react";
import "./App.css";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import { useNavigation } from '@react-navigation/native';
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

toast.configure();

function App() {
	// we want to make sure it set to false first
	const [isAuthenticated, setAuthenticated] = useState(false);

	//this is going to the be toggle function to set the auth
	const setAuth = (Boolean) => {
		setAuthenticated(Boolean);
	};

	async function isAuth() {
		try {
			const response = await fetch("http://localhost:4001/auth/is-verify", {
				method: "GET",
				headers: { token: localStorage.token },
			});

			const parseRes = await response.json();

			parseRes === true ? setAuthenticated(true) : setAuthenticated(false);

			console.log(parseRes);
		} catch (err) {
			console.error(err.message);
		}
	}
	useEffect(() => {
		isAuth();
	});

	return (
		<Fragment>
			<Router>
				{/* reason why we use render instead of component props is because
                              anytime we send props to a component we don't want it to remount */}
				{/* !isAuthenticated ? (
				<Route exact path="/login">
					<Login />
				</Route>
				) : (
				<Route exact path="/login">
					<Link to="/home" />
				</Route>
				) */}
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
									<Navigate to="/login" />
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
					</Routes>
				</div>
			</Router>
		</Fragment>
	);
}

export default App;
