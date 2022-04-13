import React, { Fragment, useState, useEffect } from "react";
//import { toast } from "react-toastify";
import "./pagecss/home.css";
// import { FontAwesomeIcon } from "@fontawesome-free-solid";
// import { encryptStorage } from "./encrypt";
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
			// encryptStorage.setItem("user_id", parseRes.user_id);
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
			<div className="container">
				<div className="row">
					<div className="col-md-4 col-sm-12 d-flex justify-content-center">
						<div className="card-body text-center text-white">
							<i className="fa-solid fa-bullseye fa-6x  my-3 "></i>
							<h2 className="card-title mb-4">Card Title</h2>

							<p className="card-text">
								Our Mission is to help the community out by helping people with
								mental health issues
							</p>
						</div>
					</div>

					<div className="col-md-4 col-sm-12 d-flex justify-content-center">
						<div className="card-body text-center text-white">
							<i className="fa-solid fa-glasses fa-6x text-center my-3 "></i>
							<h2 className="card-title mb-4">Card Title</h2>

							<p className="card-text">
								Our Mission is to help the community out by helping people with
								mental health issues
							</p>
						</div>
					</div>

					<div className="col-md-4 col-sm-12  d-flex justify-content-center">
						<div className="card-body text-center text-white pb-4">
							<i class="fa-solid fa-hand-holding-medical fa-6x text-center my-3 "></i>
							<h2 className="card-title mb-4">Card Title</h2>

							<p className="card-text">
								Our Mission is to help the community out by helping people with
								mental health issues
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="container">
				<div className="row">
					<div className="card col-md-6 col-sm-12  d-flex justify-content-center mb-5 ">
						<img
							src={require("./pictures/ProPic.jpg")}
							className="card-img-top"
							alt="..."
							style={{
								width: "25em",
								height: "15em",
								marginTop: "2em",
								marginLeft: "3em",
								marginRight: "3em",
							}}
						/>

						<div className="card-body text-center text-black">
							<h2 className="card-title mb-4">Alexey Aulov</h2>
							<p className="card-text">
								Hi my name is Alexey Aulov I am a senior at College of Staten
								Island studying Information System and Informatics. I had the
								original idea of Essential Health after I witnessed that
								sometimes the best way for people to get mental help is to have
								Therapist that can relate to you as much as possible to help you
								out. Helping people gives me the most gratitude in life.
							</p>
						</div>
					</div>
					<div className="card col-md-6 col-sm-12 d-flex justify-content-center mb-5 ">
						<div className="card-body text-center text-black">
							<i className="fa-solid fa-glasses fa-6x text-center my-3 "></i>

							<h2 className="card-title mb-4">Card Title</h2>
							<p className="card-text">
								Our Mission is to help the community out by helping people with
								mental health issues
							</p>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Home;
