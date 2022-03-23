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

const Navbar = ({ setAuth }) => {
	const logout = (e) => {
		e.preventDefault();
		localStorage.removeItem("token");
		setAuth(false);
		toast.success("Logged out Successfully!");
	};
	return (
		<>
			<Nav>
				<NavLink to="/home">
					<h1>Logo</h1>
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
						Medical Form
					</NavLink>
				</NavMenu>
				<NavBtn onClick={(e) => logout(e)}>logout </NavBtn>
			</Nav>
		</>
	);
};

export default Navbar;
