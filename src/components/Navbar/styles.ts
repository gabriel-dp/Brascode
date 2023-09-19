import styled from "styled-components";

const ACTIVE_BORDER_SIZE = 5;

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
			text-shadow: 0px 0px 2px ${(props) => props.theme.primaryText}; // BOLD
		}

		.active {
			text-shadow: 0px 0px 2px ${(props) => props.theme.primaryText}; // BOLD
			border-bottom: ${ACTIVE_BORDER_SIZE}px solid ${(props) => props.theme.primaryText};
		}

		a {
			border-top: ${ACTIVE_BORDER_SIZE}px solid transparent;
			border-bottom: ${ACTIVE_BORDER_SIZE}px solid transparent;
			height: 100%;
			padding: 0.75rem;
			display: flex;
			align-items: center;
			transition: all ease-in-out 0.2s;
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

