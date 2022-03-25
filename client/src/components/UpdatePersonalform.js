import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RestaurantsList = (props) => {
	const { personalform, setpersonalform } = useContext(RestaurantsContext);
// now here we are going to start making a route for the update feature and send them to 
// a new page and they can make a change  so another feater of react-dom-router we use this 
const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await RestaurantsFinder.get("/"); //this will append the slash to the base url
				setRestaurants(response.data.data.restaurants); //this is to set the state
			} catch (err) {
				console.err(err.message);
			}
		};
		fetchData();
	}, []); //this will run once

	const handleDelete = async (id) => {
		try {
			const response = await RestaurantsFinder.delete(`/${id}`);
			// now here its deleted but its the restaurant array needs to be updated so we do this
			setRestaurants(
				restaurants.filter((restaurant) => {
					return restaurant.id !== id;//so now we are filtering the array and when it mathces it wil not be shown
				})
			);
		} catch (err) {
            console.error(err.message)
        }
	};
    const handleUpdate = async (id) =>{
        try {
            
        } catch (err) {
            console.error(err.message)
        }
    }
	// useEffect(()=>{
	//     fetchData();
	// },[])
	return (
		<div className="list-group">
			<table className="table table-hover table-dark">
				<thead>
					<tr className="bg-primary">
						<th scope="col">Restaurant</th>
						<th scope="col">Location</th>
						<th scope="col">Price Range</th>
						<th scope="col">Ratings</th>
						<th scope="col">Edit</th>
						<th scope="col">Delete</th>
					</tr>
				</thead>
				<tbody>
					{/* and why we do this way is maybe we will get a restuarant that does not exist 
                    so this will take care of tht
                    if restaurant exsist then we will run the rest of the code */}
					{restaurants &&
						restaurants.map((restaurant) => {
							return (
								<tr key={restaurant.id}>
									<td>{restaurant.name}</td>
									<td>{restaurant.location}</td>
									<td>{"$".repeat(restaurant.price_range)}</td>
									<td>reviews</td>
									<td>
										<button onClick={()=> handleUpdate(restaurant.id)} className="btn btn-warning">Update</button>
                                        {/* bc we want to send them to a new page and we want to update that id we send the id */}
									</td>
									<td>
										<button
											onClick={() => handleDelete(restaurant.id)}
											className="btn btn-danger"
										>
											Delete
										</button>
										{/* we want to select that id and delete that restaurant by that id */}
									</td>
								</tr>
							);
						})}
					{/* <tr>
						<td>Mikes</td>
						<td>New York</td>
						<td>$</td>
						<td>Ratings</td>
						<td>
							<button className="btn btn-warning">Update</button>
						</td>
						<td>
							<button className="btn btn-warning">Delete</button>
						</td>
					</tr> */}
				</tbody>
			</table>
		</div>
	);
};

export default RestaurantsList;
