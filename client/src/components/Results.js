import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./pagecss/results.css";
import StarRating from "./StarRating";
import DetailPage from "./DetailPage";
import { Link } from "react-router-dom";
// import * as V from "victory";
// import { VictoryPie } from "victory";

// import "./pagecss/home.css";
//import "./pagecss/results.css"
const Results = (props) => {
	const [username, setUsername] = useState("");

	// const [user_id, setuserid] = useState("");
	const [results, setResults] = useState([]);

	// for the search bar
	const [searchTerm, setSearchTerm] = useState("");

	// const [personalForm, setpersonalForm] = useState([]);//
	// const [Pform, setform] = useState(false);
	async function getResults() {
		try {
			const response = await fetch(
				`http://localhost:4001/results/${props.user_id}`,
				{
					method: "GET",

					//pass token with localstorage because it is stored in the header
					headers: {
						"Content-Type": "application/json",
						token: localStorage.token,
					},
				}
			);
			const parseRes = await response.json();
			// setpersonalForm(parseData);
			console.log(parseRes);
			setUsername(parseRes.username);
			setResults(parseRes.data.resource_information);
			// setuserid(parseRes.user_id); //
			// const encryptStorage = new EncryptStorage('secret-key');
			// removed the localstorage user id
			localStorage.setItem(
				"all",
				JSON.stringify(parseRes.data.resource_information)
			);
			if (parseRes.token) {
				localStorage.setItem("token", parseRes.token);
			} else {
				toast.error(parseRes);
			}
			console.log(parseRes);
		} catch (err) {
			console.error(err.message);
		}
	}
	const renderRating = (results) => {
		if (!results.count) {
			<span className="text-warning ml-1">0 reviews</span>;
		}
		return (
			<>
				<StarRating rating={results.average_rating} />
				<span className="text-warning ml-1">({results.count})</span>
			</>
		);
	};
	//going to make a request when we get to this component, this is for getting from database
	useEffect(() => {
		getResults();
	}, [searchTerm]);
	return (
		<Fragment>
			<div className="container">
				<div className="form-group" id="searchbar">
					<input
						className="form-control"
						type="text"
						placeholder="Search ..."
						onChange={(event) => {
							setSearchTerm(event.target.value);
						}}
					/>
				</div>
				<table
					className="table table-responsive table-light  text-center text-dark rounded "
					id="table"
				>
					<thead>
						<tr>
							<th>Therapist Name</th>
							<th>Description</th>
							<th>Email</th>
							<th>Website</th>
							<th>Fax</th>
							<th>Phone Number</th>
							<th>City</th>
							<th>State</th>
							<th>Zip</th>
							<th>Ratings</th>
						</tr>
					</thead>
					<tbody>
						{results
							.filter((val) => {
								if (searchTerm == "") {
									return val;
								} else if (
									val.title.toLowerCase().includes(searchTerm.toLowerCase())
								) {
									return val;
								}
							})
							.map((results) => (
								<tr key={results.user_id}>
									<Link to={"/details"} state={results}>
										<td>{results.title}</td>
									</Link>
									<td>{results.description}</td>
									<td>{results.email}</td>
									<td>{results.website}</td>
									<td>{results.fax}</td>
									<td>{results.work_phone_number}</td>
									<td>{results.state}</td>
									<td>{results.state}</td>
									<td>{results.zipcode}</td>
									<td>{renderRating(results)}</td>

									{/* <td>
                            <EditPersonalForm personalForm={personalForm} />
                        </td> */}
									{/* <td><Editanime anime ={anime} /></td> */}
									<td>
										{/* <button
                                    className="btn btn-danger"
                                    // onClick={() => deleteAnime(anime.anime_id)}
                                >
                                    Delete
                                </button> */}
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
			{/* <div>
				<svg viewBox="0 0 450 350">
					<g transform={"translate(0, -75)"}>
						<VictoryPie
							name="pie"
							width={350}
							standalone={false}
							style={{ labels: { fontSize: 25, padding: 10 } }}
							data={[
								{ x: "a", y: 3 },
								{ x: "b", y: 4 },
								{ x: "c", y: 5 },
								{ x: "d", y: 7 },
							]}
						/>
					</g>
				</svg>
			</div> */}
		</Fragment>
	);
};
export default Results;
