import styled from "styled-components";

export const NavContainer = styled.nav`
	width: 100%;
	height: 3rem;
	padding: 0 2rem;
	background-color: ${(props) => props.theme.primary};
	color: ${(props) => props.theme.primaryText};

	display: flex;
	justify-content: space-between;
	align-items: center;

	ul {
		height: 100%;
		list-style: none;
		display: flex;
		gap: 1rem;
		transition: right ease-in-out 0.5s;
	}

	li {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		a {
			height: 100%;
			color: inherit;
			text-decoration: none;
			padding: 0 0.75rem;
			transition: all ease-in-out 0.25s;

			display: flex;
			align-items: center;
			position: relative;

			&::before {
				content: "";
				position: absolute;
				width: 1.5rem;
				height: 2px;
				border-radius: 1rem;
				background-color: transparent;
				bottom: 0.5rem;
				left: 50%;
				transform: translateX(-50%);
				transition: background ease-in-out 0.25s;
			}

			&:hover,
			&.active {
				text-shadow: 0px 0px 2px ${(props) => props.theme.primaryText}; // BOLD
				&::before {
					background-color: ${(props) => props.theme.primaryText};
				}
			}
		}
	}

	@media (max-width: 768px) {
		ul {
			flex-direction: column;
			align-items: flex-end;
			justify-content: flex-start;
			background-color: ${(props) => props.theme.primary};

			position: fixed;
			right: 0;
			top: 3rem;
			height: 100vh;
			padding: 1rem 2rem 1rem 3rem;
			padding-left: 3rem;

			a {
				padding: 0;

				&::before {
					width: 0.35rem;
					height: 0.35rem;
					left: -1rem;
					bottom: 50%;
					transform: translateY(50%);
				}
			}
		}

		.menu-off {
			right: -50%;
		}

		li {
			height: auto;
		}
	}
`;

export const NavHome = styled.div`
	height: 100%;
	padding: 0 0.25rem;
	display: flex;
	align-items: center;

	a {
		color: inherit;
		text-decoration: none;
	}
`;

export const MenuIconContainer = styled.div`
	font-size: 1.25rem;
	display: none;
	cursor: pointer;

	@media (max-width: 768px) {
		display: block;
	}
`;

