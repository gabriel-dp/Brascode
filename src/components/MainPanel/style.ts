import styled from "styled-components";

const NAVBAR_HEIGHT = 3;
const CONTENT_WIDTH = 70;

export const Screen = styled.div`
	width: 100%;
	min-height: 100dvh;

	display: flex;
	flex-direction: column;
	align-items: center;

	.navbar-container {
		height: ${NAVBAR_HEIGHT}rem;
	}

	.navbar-wrapper {
		width: min(100%, ${CONTENT_WIDTH}rem);
	}

	.main-content {
		margin-top: ${NAVBAR_HEIGHT}rem;
		width: min(100%, ${CONTENT_WIDTH}rem);
	}
`;

export const MainContainer = styled.div.attrs({
	className: "main-content",
})`
	width: 100%;
	padding: 1.5rem;
	height: 100dvh;
	color: ${(props) => props.theme.text};

	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;

	h1 {
		font-size: 1.5rem;
		color: ${(props) => props.theme.primary};
	}
`;

