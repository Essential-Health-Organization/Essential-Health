import React from "react";
import {
	Nav,
	NavLink,
	Bars,
	NavMenu,
	NavBtn,
	NavBtnLink,
} from "./NavbarElements";
const Navbar = () => {
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
						home
					</NavLink>
                    <NavLink to="/pform" activeStyle>
						Personal Form
					</NavLink>
                    <NavLink to="/mform" activeStyle>
						medical form
					</NavLink>
				</NavMenu>
				<NavBtn>
					<NavBtnLink to="/logout">logout</NavBtnLink>
				</NavBtn>
			</Nav>
		</>
	);
};

export default Navbar;
