import React, { Fragment, useState, useEffect } from "react";
//import DoughnutChart from "./DoughnutChart";
//import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
//import { toast } from "react-toastify";
import "./pagecss/home.css";
import * as V from "victory";
import { VictoryPie } from "victory";
// import pieChartBasic from "./DoughnutChart";
// import { Doughnut } from "react-chartjs-2";
// import { FontAwesomeIcon } from "@fontawesome-free-solid";
// import { encryptStorage } from "./encrypt";
const Home = () => {
	const [username, setUsername] = useState("");
	const [user_id, setuserid] = useState("");
	const [occ, setOcc] = useState([]);
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

		try {
			const response = await fetch("http://localhost:4001/results/occ", {
				method: "GET",
				//pass token with localstorage because it is stored in the header
				headers: { token: localStorage.token },
			});

			const parseRes = await response.json();
			// setpersonalForm(parseData);
			setOcc(parseRes.data.occupationResults);

			console.log(parseRes.data.occupationResults);
		} catch (err) {
			console.error(err.message);
		}
	}

	//going to make a request when we get to this component, this is for getting from database
	useEffect(() => {
		getUsername();
	}, []);

	// 	const PIEDATAVALUES = occ.map((occupation) =>
	// 		{ "x"= occupation.occupation,
	// 		  "y"= occupation.values
	// 		},
	// );
	// console.log(PIEDATAVALUES);
	// const totvalues = [];
	const result = [];
	let length = 0;
	for (let i = 0; i < occ.length; i++) {
		length += Number(occ[i].values);
	}
	const piedataresults = occ.reduce((a, item) => {
		// totvalues += item.values;
		const num = (item.values / length) * 100;
		result.push({
			x: item.occupation + `: ${Math.floor(num)} %`,
			y: item.values,
		});
		return result;
	}, []);
	//console.log(piedataresults);

	return (
		<div>
			<div className="container">
				<div className="row" id="about">
					<div className="col-md-4 col-sm-12 d-flex justify-content-center">
						<div className="card-body text-center text-white">
							<i className="fa-solid fa-bullseye fa-6x  my-3 "></i>
							<h2 className="card-title mb-4">Mission</h2>

							<p className="card-text">
								Helping clients find a therapist with a relatable approach
							</p>
						</div>
					</div>

					<div className="col-md-4 col-sm-12 d-flex justify-content-center">
						<div className="card-body text-center text-white">
							<i className="fa-solid fa-glasses fa-6x text-center my-3 "></i>
							<h2 className="card-title mb-4">Vision</h2>

							<p className="card-text">
								A helping hand that can guide a community towards better mental
								health
							</p>
						</div>
					</div>

					<div className="col-md-4 col-sm-12  d-flex justify-content-center">
						<div className="card-body text-center text-white pb-4">
							<i className="fa-solid fa-hand-holding-medical fa-6x text-center my-3 "></i>
							<h2 className="card-title mb-4">Values</h2>

							<p className="card-text">
								Dedicated to providing resources and support no matter the time
								of day.
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="row mb-5 " id="piechartrow">
				<div
					className="col-md-6 col-sm-12 text-white text-center "
					id="pietext"
				>
					<p id="pietext">
						There are over 12,000 different occapations in the world. Essential
						Health is there to provide occupational therapist to anyone that
						needs it whenever they need it. Here is visual representation of the
						types of occupation we have at the moment, the list keeps on growing
						everyday.
					</p>
				</div>
				<div className="col-md-6 col-sm-12 mt-3" id="piechartcol">
					<svg viewBox="-55 -25 450 350" id="piechart">
						<g transform={"translate(0, -75)"}>
							<VictoryPie
								colorScale={[
									"#6680FF",
									"#DFFF00",
									"#DF4E4F",
									"#FFB600",
									"#eeaaaa",
									"#23B936",
								]}
								name="pie"
								width={350}
								innerRadius={75}
								standalone={false}
								style={{
									labels: { fill: "white", fontSize: 12, padding: 14 },
								}}
								data={piedataresults}
							/>
						</g>
					</svg>
				</div>
			</div>

			<div className="container-fluid">
				<div className="row justify-content-around" id="aboutus">
					<div
						className="card col-lg-5 col-md-6 col-sm-12  d-flex justify-content-center mb-5 "
						id="CardOne"
					>
						<img
							src={require("./pictures/ProPic.jpg")}
							className="card-img-top"
							id="pictureOne"
							alt="..."
						/>

						<div className="card-body text-center text-white">
							<h2 className="card-title mb-4">Alexey Aulov</h2>
							<p className="card-text">
								Hi my name is Alexey Aulov I am a senior at College of Staten
								Island studying Information System and Informatics. I had the
								original idea of Essential Health after I witnessed that
								sometimes the best way for people to get mental help is to have
								therapist that can relate to you as much as possible to help you
								out. Helping people gives me the most gratitude in life.
							</p>
						</div>
					</div>
					<div
						className="card col-lg-5 col-md-6 col-sm-12 d-flex justify-content-center mb-5 "
						id="CardTwo"
					>
						<img
							src={require("./pictures/JLThree.jpg")}
							className="card-img-top"
							alt="..."
							id="pictureTwo"
						/>
						<div className="card-body text-center text-white">
							<h2 className="card-title mb-4">Jonathan Leibovici</h2>
							<p className="card-text">
								Hi my name is Jonathan Leibovici I am also a senior at College
								of Staten Island studying Information System and Informatics. We
								had an idea of creating a website that would change peoples view
								about mental health and how important having a good mental
								health is. Having a therapist that can relate to you, is
								extremly beneficial. Helping people find resources that they
								need is really rewarding on its own.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
