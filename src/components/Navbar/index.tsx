import { useState } from "react";

import { Link, NavLink } from "react-router-dom";
import { MdMenu, MdOutlineClose } from "react-icons/md";
import { NavContainer, NavHome, MenuIconContainer } from "./styles";

export default function Navbar() {
	const [menuActive, setMenuActive] = useState(false);

	function handleMenuClick() {
		console.log(!menuActive);
		setMenuActive(!menuActive);
	}

	function closeMenu() {
		setMenuActive(false);
	}

	function NavComponent(props: { title: string; path: string }) {
		return (
			<li>
				<NavLink onClick={closeMenu} to={props.path}>
					{props.title}
				</NavLink>
			</li>
		);
	}

	return (
		<NavContainer>
			<NavHome onClick={closeMenu}>
				<Link to="/">
					<h1>LOGO</h1>
				</Link>
			</NavHome>
			<ul className={menuActive ? "menu-on" : "menu-off"}>
				<NavComponent title="Tabelas" path="/tabelas" />
				<NavComponent title="Jogos" path="/jogos" />
				<NavComponent title="Times" path="/times" />
				<NavComponent title="Jogadores" path="/jogadores" />
			</ul>
			<MenuIconContainer onClick={handleMenuClick}>{menuActive ? <MdOutlineClose /> : <MdMenu />}</MenuIconContainer>
		</NavContainer>
	);
}

