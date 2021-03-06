import React from "react";
import {
	Nav,
	NavLink,
	Bars,
	NavMenu,
	NavBtn,
	NavBtnLink,
} from "./NavbarElements";
import { toast } from "react-toastify";
import logo from "../pictures/new_logo.png";
const Navbar = ({ setAuth }) => {
	const logout = (e) => {
		e.preventDefault();
		document.cookie = "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
		localStorage.removeItem("token");

		// localStorage.removeItem("token");
		localStorage.removeItem("user_id");
		localStorage.removeItem("all");
		setAuth(false);
		toast.success("Logged out Successfully!");
	};
	return (
		<>
			<Nav>
				<NavLink to="/home">
					<img src={logo} alt="Logo" />
				</NavLink>
				<Bars />
				<NavMenu>
					{/* <NavLink to="/login" activeStyle>
                        login
                    </NavLink>
                    <NavLink to="/register" activeStyle>
                        register
                    </NavLink> */}
					<NavLink to="/home" activeStyle>
						Home
					</NavLink>
					<NavLink to="/pform" activeStyle>
						Personal Form
					</NavLink>
					<NavLink to="/mform" activeStyle>
						Medical form
					</NavLink>
					<NavLink to="/profile" activeStyle>
						Profile
					</NavLink>
					<NavLink to="/results" activeStyle>
						Results
					</NavLink>
				</NavMenu>
				<NavBtn onClick={(e) => logout(e)}>
					<NavBtnLink to="/login">logout</NavBtnLink>
				</NavBtn>
			</Nav>
		</>
	);
};
export default Navbar;
