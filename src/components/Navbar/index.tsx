import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MdMenu, MdOutlineClose } from "react-icons/md";

import { Pages } from "@/routes";
import logo from "@/assets/logo-white.svg";

import { NavContainer, NavHome, MenuIconContainer, NavWrapper } from "./styles";

export default function Navbar() {
	const [menuActive, setMenuActive] = useState(false);

	// Controls menu visibility on low width
	function handleMenuClick() {
		setMenuActive(!menuActive);
	}

	// Controls menu closing
	function closeMenu() {
		setMenuActive(false);
	}

	// Creates a component in Navbar for each page
	function NavComponent(props: { title: string; path: string }) {
		return (
			<li>
				<NavLink onClick={closeMenu} to={props.path}>
					{props.title}
				</NavLink>
			</li>
		);
	}

	// Fix page path active state removing the end slash
	function fixPagePath(page: string) {
		if (page[page.length - 1] == "/") return page.slice(0, page.length - 1);
		return page;
	}

	return (
		<NavContainer className="navbar-container">
			<NavWrapper className="navbar-wrapper">
				<NavHome onClick={closeMenu}>
					<Link to={fixPagePath(Pages.Home)}>
						<img src={logo} />
					</Link>
				</NavHome>
				<ul className={menuActive ? "on" : "off"}>
					<NavComponent title="Torneios" path={fixPagePath(Pages.Tournaments)} />
					<NavComponent title="Jogos" path={fixPagePath(Pages.Games)} />
					<NavComponent title="Times" path={fixPagePath(Pages.Teams)} />
					<NavComponent title="Jogadores" path={fixPagePath(Pages.Players)} />
				</ul>
				<MenuIconContainer onClick={handleMenuClick}>{menuActive ? <MdOutlineClose /> : <MdMenu />}</MenuIconContainer>
			</NavWrapper>
		</NavContainer>
	);
}

