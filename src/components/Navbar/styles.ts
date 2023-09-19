import styled from "styled-components";

export const NavContainer = styled.nav`
	width: 100%;
	padding: 0 1.5rem;
	background-color: ${(props) => props.theme.primary};
	color: ${(props) => props.theme.primaryText};

	display: flex;
	justify-content: space-between;
	align-items: center;

	ul {
		list-style: none;
		display: flex;
		gap: 1rem;
	}

	li {
		height: 100%;
		display: flex;
		justify-content: center;

		:hover {
			color: ${(props) => props.theme.secondary};
		}

		.active {
			text-shadow: 0px 0px 2px ${(props) => props.theme.secondary}; // BOLD
			color: ${(props) => props.theme.secondary};
		}

		a {
			height: 100%;
			padding: 1rem;
			display: flex;
			align-items: center;
		}
	}

	a {
		color: inherit;
		text-decoration: none;
	}
`;

export const NavHome = styled.div`
	height: 100%;
	display: flex;
	align-items: center;
	margin: 0 2.5rem;
`;

