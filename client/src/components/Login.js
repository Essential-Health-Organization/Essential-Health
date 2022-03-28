import React, { Fragment, useState } from "react";
import Message from "./Message";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./pagecss/loginregister.css";

const Login = ({ setAuth }) => {
	const [inputs, setInputs] = useState({
		email: "",
		password: "",
	});

	const { email, password } = inputs;

	const onChange = (e) => {
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};

	const onSubmitForm = async (e) => {
		e.preventDefault();
		try {
			const body = { email, password };

			const response = await fetch("http://localhost:4001/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});

			const parseRes = await response.json();

			if (parseRes.token) {
				localStorage.setItem("token", parseRes.token);
				setAuth(true);
				toast.success("login successfully!");
			} else {
				setAuth(false);

				toast.error(parseRes);
			}
		} catch (err) {
			console.error(err.message);
		}
	};
	return (
		<Fragment>
			<div
				className="container-fluid"
				style={{
					marginTop: "150px",
				}}
			>
				<div className="row ">
					<div className="col-md-4">
						<Message />
					</div>
					<div className="col-md-8">
						<form
							className="text-center mx-auto"
							style={{ width: "300px" }}
							onSubmit={onSubmitForm}
						>
							<h1 className="text-white">Login</h1>
							<input
								type="email"
								name="email"
								placeholder="email"
								className="form-control my-3"
								value={email}
								onChange={(e) => onChange(e)}
							/>

							<input
								type="password"
								name="password"
								placeholder="password"
								className="form-control my-3"
								value={password}
								onChange={(e) => onChange(e)}
							/>
							<button className="btn text-light mt-3 text-center">
								submit
							</button>
							<div className="mt-4">
								<Link className="text-white" to="/register">
									Register
								</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Login;