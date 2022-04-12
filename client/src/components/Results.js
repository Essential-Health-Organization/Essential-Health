import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
// import "./pagecss/home.css";
//import "./pagecss/results.css"
const Results = (props) => {
	const [username, setUsername] = useState("");
	// const [user_id, setuserid] = useState("");
    const [results, setResults] = useState([]);
	// const [personalForm, setpersonalForm] = useState([]);//
	// const [Pform, setform] = useState(false);
	async function getResults() {
		try {
			const response = await fetch(`http://localhost:3005/results/${props.user_id}`, {
				method: "GET",
				//pass token with localstorage because it is stored in the header
				headers: { token: localStorage.token },
			});
			const parseRes = await response.json();
			// setpersonalForm(parseData);
            console.log(parseRes)
			setUsername(parseRes.username);
            setResults(parseRes.data.resource_information)
			// setuserid(parseRes.user_id); //
			// const encryptStorage = new EncryptStorage('secret-key');
			// removed the localstorage user id
			console.log(parseRes);
		} catch (err) {
			console.error(err.message);
		}
	}
	//going to make a request when we get to this component, this is for getting from database
	useEffect(() => {
		getResults();
	}, []);
	return (
		<Fragment>
		<table className="table mt-5 text-center text-white">
				<thead>
					<tr>
						<th>Therapist Name</th>
                        <th>description</th>
						<th>email</th>
						<th>Website</th>
                        <th>fax</th>
						<th>phone_number</th>
						<th>city</th>
						<th>state</th>
						<th>zip</th>
						{/* <th>Edit</th> */}
					</tr>
				</thead>
				<tbody>
					{/* 	<tr>
						<td>John</td>
						<td>Doe</td>
						<td>john@example.com</td>
					</tr>*/}
                    {results.map((results) => (
					<tr key={results.user_id}>
						<td>{results.title}</td>
                        <td>{results.description}</td>
						<td>{results.email}</td>
                        <td>{results.website}</td>
                        <td>{results.fax}</td>
						<td>{results.work_phone_number}</td>
						<td>{results.state}</td>
						<td>{results.state}</td>
						<td>{results.zipcode}</td>
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
		</Fragment>
	);
};
export default Results;
