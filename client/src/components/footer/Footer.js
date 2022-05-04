import React from "react";
import "./Footer.css";
export default function Footer() {
	return (
		<div className="main-footer ">
			<div className="container">
				<div className="row ">
					<div className="col footercol mx-auto text-white mt-2 ">
						<h4 className="text-center">EH</h4>
						<ul className="list-unstyled text-center">
							<li>About Us</li>
							<li>Contact Us</li>
							<li>Careers</li>
						</ul>
					</div>
				</div>
				<div className="row">
					<div className="col-12 py-1 mx-auto ">
						<p className="text-xs-center text-white text-center">
							&copy;{new Date().getFullYear()} Essential Health - All Rights
							Reserved
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
