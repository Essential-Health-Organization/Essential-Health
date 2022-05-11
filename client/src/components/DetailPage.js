import React, { useContext, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
// import { RestaurantsContext } from "../context/RestaurantsContext";
// import RestaurantFinder from "../apis/RestaurantFinder";
import StarRating from "../components/StarRating";
import Reviews from "./Reviews";
import AddReview from "./AddReview";
const DetailPage = (props) => {
	const location = useLocation();
	// const { id } = useParams();
	console.log(props.Thepropsid);
	console.log(location.state);
	const [selectedTherapist, setSelectedTherapist] = useState([]);
	const [comments, setComments] = useState([]);

	const updatePage = (n, r, ra) => {
		setSelectedTherapist((v) => [...v, { name: n, review: r, rating: ra }]);
	};
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
			setComments(parseRes.data.review_information);
		} catch (err) {
			console.error(err.message);
		}
		console.log("this is parseRes for selected therapists", selectedTherapist);
		console.log("this is parseRes for comments", comments);
	}
	useEffect(() => {
		getReviews();
		console.log("details");
	}, []);
	console.log("this is the selected therapist", selectedTherapist);
	return (
		<div>
			<>
				<h1 className="text-center display-4 text-white">
					{location.state.title}
				</h1>
				<div className="text-center">
					<StarRating
						rating={location.state.average_rating}
						selectedTherapist={selectedTherapist}
					/>
					<span className="text-warning ml-1">
						{location.state.count ? `(${location.state.count})` : "(0)"}
					</span>
				</div>
				<div className="mt-3" id="test">
					<Reviews reviews={selectedTherapist} />
				</div>
				<AddReview updatePage={updatePage} />
			</>
		</div>
	);
};
export default DetailPage;
