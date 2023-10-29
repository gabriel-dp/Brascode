import styled from "styled-components";

const NAVBUTTON_PADDING = "0.75rem";

export const NavContainer = styled.nav`
	width: 100%;
	padding: 0;
	background-color: ${(props) => props.theme.primary};
	color: ${(props) => props.theme.primaryText};
	filter: drop-shadow(0 0 0.5rem #00000077);

	display: flex;
	justify-content: center;

	position: fixed;
	top: 0;
	z-index: 2;

	ul {
		height: 100%;
		list-style: none;
		display: flex;
		gap: 1rem;
		transform: translateX(${NAVBUTTON_PADDING});
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
			padding: 0 ${NAVBUTTON_PADDING};
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
			transition: transform ease-in-out 0.5s;
			transform: translateX(0);

			position: fixed;
			left: 100%;
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

		.on {
			transform: translateX(-100%);
		}

		li {
			height: auto;
		}
	}
`;

export const NavWrapper = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const NavHome = styled.div`
	height: 100%;
	display: flex;
	align-items: center;

	a {
		color: inherit;
		text-decoration: none;
		height: 100%;
		padding: 0.65rem 0;

		img {
			height: 100%;
			max-height: 100%;
		}
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
