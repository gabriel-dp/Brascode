import { Link, NavLink } from "react-router-dom";
import { NavContainer, NavHome } from "./styles";

function NavComponent(props: { title: string; path: string }) {
	return (
		<li>
			<NavLink to={props.path}>{props.title}</NavLink>
		</li>
	);
}

export default function Navbar() {
	return (
		<NavContainer>
			<NavHome>
				<Link to="/">
					<h1>LOGO</h1>
				</Link>
			</NavHome>
			<ul>
				<NavComponent title="Tabelas" path="/tabelas" />
				<NavComponent title="Jogos" path="/jogos" />
				<NavComponent title="Times" path="/times" />
				<NavComponent title="Jogadores" path="/jogadores" />
			</ul>
		</NavContainer>
	);
}

