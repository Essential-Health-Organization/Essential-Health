import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import Reviews from "./Reviews";
// import { useHistory } from "react-router-dom";
const AddReview = ({ updatePage }) => {
	const location = useLocation();
	console.log(location.state.resource_id);
	// const {id} = useParams()
	// console.log(props)

	const [name, setName] = useState("");
	const [reviewText, setReviewText] = useState("");
	const [rating, setRating] = useState("Rating");

	const handleSubmitReview = async (e) => {
		e.preventDefault();
		try {
			const body = {
				name,
				// resource,
				review: reviewText,
				rating,
			};
			const response = await fetch(
				`http://localhost:4001/reviews/${location.state.resource_id}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						token: localStorage.token,
					},
					body: JSON.stringify(body),
				}
			);
			// navigate("/");
			// navigate(location.pathname);
			const parseRes = await response.json();
			updatePage(name, reviewText, rating);
			setName("");
			setReviewText("");
			setRating("Rating");
			console.log("this is parseRes", parseRes);
		} catch (err) {
			console.error(err.message);
		}
	};
	useEffect(() => {
		handleSubmitReview();
		console.log("add review component");
	}, []);

	return (
		<div className="mt-4">
			<form action="">
				<div className="row">
					<div className="form-group col-8">
						<label htmlFor="name" className="text-white">
							Name
						</label>
						<input
							value={name}
							onChange={(e) => setName(e.target.value)}
							id="name"
							placeholder="name"
							type="text"
							className="form-control"
						/>
					</div>
					<div className="form-group  col-4">
						<label htmlFor="rating" className="text-white">
							Rating
						</label>
						<select
							value={rating}
							onChange={(e) => setRating(e.target.value)}
							id="rating"
							className="custom-select"
						>
							<option disabled>Rating</option>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
						</select>
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="Review" className="text-white">
						Review
					</label>
					<textarea
						value={reviewText}
						placeholder="Text..."
						onChange={(e) => setReviewText(e.target.value)}
						id="Review"
						className="form-control "
					></textarea>
				</div>
				<button
					type="submit"
					onClick={handleSubmitReview}
					className="btn btn-primary mt-3"
				>
					Submit
				</button>
			</form>
		</div>
	);
};
export default AddReview;
