import styled from "styled-components";

export const QuizContainer = styled.div`
	width: 100%;
	user-select: none;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1.5rem;

	.image-container {
		img {
			height: 6rem;
			max-height: 6rem;
		}
	}

	.options-container {
		width: 100%;

		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(10rem, 100%), 1fr));
		gap: 1rem;
	}
`;

export const OptionButton = styled.button`
	padding: 0.625rem 1rem;
	border-radius: 0.5rem;
	border: 1px solid ${(props) => props.theme.gray};
	transition: all 0.25s ease-in-out;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;

	&.active {
		background-color: ${(props) => props.theme.lightgray || "default"};
		cursor: pointer;

		&:hover {
			border: 1px solid ${(props) => props.theme.primary};
		}
	}

	&.deactive {
		background-color: ${(props) => props.theme.gray};

		&.correct {
			font-weight: bold;
			color: ${(props) => props.theme.primaryText} !important;
			background-color: ${(props) => props.theme.primary} !important;
		}

		&:not(&.correct) {
			text-decoration: line-through;
			opacity: 0.5;
		}
	}

	&.wrong {
		background-color: #ff0000;
	}
`;
