import React, { Fragment, useState, useEffect } from "react";
import "./App.css";
import { toast } from "react-toastify";
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
import PersonalForm from "./components/PersonalForm";
import Navbar from "./components/Navbar/Navbar";
import { encryptStorage } from "../src/components/encrypt";
import MedicalForm from "./components/MedicalForm";
import ListPersonalForm from "./components/ListPersonalForm";
import Results from "./components/Results";
import DetailPage from "./components/DetailPage";
import Footer from "./components/footer/Footer";

toast.configure();
function App() {
	const [username, setUsername] = useState("");
	const [user_id, setuserid] = useState("");
	const [results, setresults] = useState([]);

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
			const response = await fetch("http://localhost:4001/auth/is-verify", {
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
		//in the login comp we are setting user id
		// this app.js we are doing reading the value user id val that was set in the login comp
		// and setting the user id value of the app comp to value from what we receive the
		// encrypt storage
		// const storedUserID = localStorage.getItem("user_id");

		const storedUserID = localStorage.getItem("user_id");
		//const value = encryptStorage.decryptString(storedUserID);
		setuserid(storedUserID); //
		console.log(storedUserID);

		const TheRes = localStorage.getItem("all");
		console.log(TheRes);
		// //const value = encryptStorage.decryptString(TheRes);
		setresults(JSON.parse(TheRes));
	});
	console.log(user_id);

	return (
		<Fragment>
			<Router>
				<div className="background">
					<Navbar setAuth={setAuth} user_id={user_id} />
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
										<Login setAuth={setAuth} user_id={user_id} />
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
										<Register setAuth={setAuth} user_id={user_id} />
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
										<Home setAuth={setAuth} user_id={user_id} />
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
										<PersonalForm setAuth={setAuth} user_id={user_id} />
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
										<MedicalForm setAuth={setAuth} user_id={user_id} />
									) : (
										<Navigate to="/home" />
									)
								}
							/>
							<Route
								exact
								path="/profile"
								element={
									isAuthenticated ? (
										<ListPersonalForm setAuth={setAuth} user_id={user_id} />
									) : (
										<Navigate to="/home" />
									)
								}
							/>
							<Route
								exact
								path="/results"
								element={
									isAuthenticated ? (
										<Results setAuth={setAuth} user_id={user_id} />
									) : (
										<Navigate to="/home" />
									)
								}
							/>
							<Route
								exact
								path="/details"
								element={
									isAuthenticated ? (
										<DetailPage
											setAuth={setAuth}
											user_id={user_id}
											Theprops={results}
										/>
									) : (
										<Navigate to="/home" />
									)
								}
							/>
							{/* <Route exact path="/pfrom" element={<Personalform/>}/> */}
							{/* {/ <Route exact path="/home" element={props => <Home {...props} />} /> */}
						</Routes>
					</div>
				</div>
				<Footer />
			</Router>
		</Fragment>
	);
}
export default App;

// import React, { Fragment, useState, useEffect } from "react";
// import "./App.css";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
// 	BrowserRouter as Router,
// 	Routes,
// 	Route,
// 	Navigate,
// } from "react-router-dom";
// import Home from "./components/Home";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import PersonalForm from "./components/PersonalForm";
// import MedicalForm from "./components/MedicalForm";
// import Navbar from "./components/Navbar/Navbar";
// import ListPersonalForm from "./components/ListPersonalForm";
// import Results from "./components/Results";
// import Footer from "./components/footer/Footer";
// import { encryptStorage } from "../src/components/encrypt";

// toast.configure();
// function App(props) {
// 	// const [username, setUsername] = useState("");
// 	const [user_id, setuserid] = useState("");
// 	// we want to make sure it set to false first
// 	const [isAuthenticated, setAuthenticated] = useState(false);
// 	//this is going to the be toggle function to set the auth
// 	const setAuth = (Boolean) => {
// 		setAuthenticated(Boolean); //this will change the state
// 	};
// 	//this is going to check if the use is authenticated even if you refresh the page
// 	async function isAuth() {
// 		try {
// 			//check if the user is still validated
// 			const response = await fetch("http://localhost:4001/auth/is-verify", {
// 				method: "GET",
// 				headers: { token: localStorage.token },
// 			});
// 			const parseRes = await response.json();
// 			console.log(parseRes);
// 			//saying if parse is true setauth to true else set to false
// 			parseRes === true ? setAuthenticated(true) : setAuthenticated(false);
// 		} catch (err) {
// 			console.error(err.message);
// 		}
// 	}
// 	useEffect(() => {
// 		isAuth();
// 		const storedUserID = encryptStorage.getItem("user_id");
// 		//const value = encryptStorage.decryptString(storedUserID);
// 		setuserid(storedUserID); //
// 		console.log(storedUserID);
// 		//in the login comp we are setting user id
// 		// this app.js we are reading the value user_id val that was set in the login comp
// 		// and setting the user_id value of the app comp to value from what we receive the
// 		// encrypt storage
// 	});
// 	return (
// 		<Fragment>
// 			<Router>
// 				<div className="background">
// 					<Navbar setAuth={setAuth} user_id={user_id} />
// 					{/* reason why we use render instead of component props is because
//                               anytime we send props to a component we don't want it to remount /}
//                               !isAuthenticated ?
//                               (<Route exact path="/login">
//                               <Login/>
//                               </Route>)
//                               :
//                               (<Route exact path="/login">
//                               <Link to="/home"/>
//                               </Route>)
//                               */}
// 					<div className="container">
// 						<Routes>
// 							<Route
// 								exact
// 								path="/login"
// 								element={
// 									!isAuthenticated ? (
// 										<Login setAuth={setAuth} />
// 									) : (
// 										<Navigate to="/home" />
// 									)
// 								}
// 							/>
// 							<Route
// 								exact
// 								path="/register"
// 								element={
// 									!isAuthenticated ? (
// 										<Register setAuth={setAuth} />
// 									) : (
// 										<Navigate to="/home" />
// 									)
// 								}
// 							/>
// 							<Route
// 								exact
// 								path="/home"
// 								element={
// 									isAuthenticated ? (
// 										<Home setAuth={setAuth} user_id={user_id} />
// 									) : (
// 										<Navigate to="/login" />
// 									)
// 								}
// 							/>
// 							<Route
// 								exact
// 								path="/pform"
// 								element={
// 									isAuthenticated ? (
// 										<PersonalForm setAuth={setAuth} user_id={user_id} />
// 									) : (
// 										<Navigate to="/home" />
// 									)
// 								}
// 							/>
// 							<Route
// 								exact
// 								path="/mform"
// 								element={
// 									isAuthenticated ? (
// 										<MedicalForm setAuth={setAuth} user_id={user_id} />
// 									) : (
// 										<Navigate to="/home" />
// 									)
// 								}
// 							/>

// 							<Route
// 								exact
// 								path="/profile"
// 								element={
// 									isAuthenticated ? (
// 										<ListPersonalForm setAuth={setAuth} user_id={user_id} />
// 									) : (
// 										<Navigate to="/home" />
// 									)
// 								}
// 							/>
// 							<Route
// 								exact
// 								path="/results"
// 								element={
// 									isAuthenticated ? (
// 										<Results setAuth={setAuth} user_id={user_id} />
// 									) : (
// 										<Navigate to="/home" />
// 									)
// 								}
// 							/>
// 							{/* <Route exact path="/pfrom" element={<Personalform/>}/> */}
// 							{/* {/ <Route exact path="/home" element={props => <Home {...props} />} /> */}
// 						</Routes>
// 					</div>
// 				</div>

// 				<Footer />
// 			</Router>
// 		</Fragment>
// 	);
// }
// export default App;
