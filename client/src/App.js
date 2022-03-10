import React, { Fragment, useState } from "react";
import "./App.css";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
// import { useNavigation } from '@react-navigation/native';
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
	// we want to make sure it set to false first
	const [isAuthenticated, setAuthenticated] = useState(false);

//this is going to the be toggle function to set the auth
	const setAuth = (Boolean) =>{
    setAuthenticated(Boolean)//this will change the state
  }
	return (
		<Fragment>
			<Router>
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
							element={!isAuthenticated ? <Login setAuth={setAuth}/> : <Navigate to="/home" />}
						/>
						<Route
							exact
							path="/register"
							element={
								!isAuthenticated ? <Register setAuth={setAuth} /> : <Navigate to="/login" />
							}
						/>
						<Route
							exact
							path="/home"
							element={isAuthenticated ? <Home setAuth={setAuth} /> : <Navigate to="/login" />}
						/>
						{/* {/ <Route exact path="/home" element={props => <Home {...props} />} /> */}
					</Routes>
				</div>
			</Router>
		</Fragment>
	);
}

export default App;
