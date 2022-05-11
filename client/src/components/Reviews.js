import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";
import "./pagecss/reviews.css";
const Reviews = ({ reviews }) => {
	const [random, setRandom] = useState("");
	useEffect(() => {
		setRandom(`${Math.random() * 100000}`);
		console.log(" review component");
	}, []);
	return (
		<div className="row row-cols-3 mb-2">
			{reviews.map((review) => {
				return (
					<div
						key={review.id}
						className="card text-white bg-primary mb-3  mr-4"
						style={{ maxWidth: "30%" }}
					>
						<div className="card-header d-flex justify-content-between">
							<span>{review.name}</span>
							<span>
								<StarRating
									rating={review.rating}
									selectedTherapist={reviews}
								/>
							</span>
						</div>
						<div className="card-body">
							<p className="card-text">{review.review}</p>
						</div>
					</div>
				);
			})}
		</div>
	);
};
export default Reviews;
