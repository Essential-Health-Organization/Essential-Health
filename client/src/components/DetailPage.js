import React, { useContext, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
// import { RestaurantsContext } from "../context/RestaurantsContext";
// import RestaurantFinder from "../apis/RestaurantFinder";
// import StarRating from "../components/StarRating";
import Reviews from "./Reviews";
import AddReview from "./AddReview";
const DetailPage = (props) => {
	const location = useLocation();
	// const { id } = useParams();
	console.log(props.Thepropsid);
	console.log(location.state);
	const [selectedTherapist, setSelectedTherapist] = useState([]);
	async function getReviews() {
		try {
			const response = await fetch(
				`http://localhost:4001/Getreviews/${location.state.resource_id}`,
				{
					method: "GET",
					//pass token with localstorage because it is stored in the header
					headers: { token: localStorage.token },
				}
			);
			const parseRes = await response.json();
			// setpersonalForm(parseData);
			// setUsername(parseRes.username);
			// setuserid(parseRes.user_id); //
			// const encryptStorage = new EncryptStorage('secret-key');
			// removed the localstorage user id
			setSelectedTherapist(parseRes.data.review_information);
			console.log("this is parseRes", parseRes);
		} catch (err) {
			console.error(err.message);
		}
	}
	useEffect(() => {
		getReviews();
	}, []);
	console.log("this is the selected therapist", selectedTherapist);
	return (
		<div>
			<>
				<div className="mt-3" id="test">
					<Reviews reviews={selectedTherapist} />
				</div>
				<AddReview />
			</>
		</div>
	);
};
export default DetailPage;
