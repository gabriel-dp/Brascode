import styled from "styled-components";

export const CardContainer = styled.div`
	max-width: 25rem;
	padding: 1rem 1.5rem;
	border-radius: 0.5rem;
	background-color: ${(props) => props.theme.white};
	border: 1px solid ${(props) => props.theme.gray};
	cursor: pointer;
	transition: all 0.25s ease-in-out;

	display: flex;
	flex-direction: column;
	gap: 0.5rem;

	&:hover {
		background-color: ${(props) => props.theme.primaryHighlight}33;
	}

	.teams {
		width: 100%;

		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 1rem;

		.team {
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: 0.75rem;

			img {
				max-height: 2rem;
			}

			.score {
				font-weight: bold;
			}
		}
	}

	.description {
		width: 100%;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1rem;

		.time {
			font-size: 0.8rem;

			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
	}
`;

