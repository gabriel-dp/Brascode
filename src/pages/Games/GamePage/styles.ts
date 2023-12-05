import styled from "styled-components";

export const GameContainer = styled.div`
	width: 100%;
	padding: 2.5rem 1.5rem;
	border-radius: 0.5rem;
	background-color: ${(props) => props.theme.white};

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	gap: 3rem;

	h2 {
		color: ${(props) => props.theme.primary};
	}

	.description-container {
		width: min(100%, 40rem);

		display: flex;
		flex-direction: row;
		justify-content: center;
		flex-wrap: wrap;
		gap: 2rem;

		.data {
			display: flex;
			flex-direction: row;
			gap: 0.5rem;
			font-size: 0.8rem;

			.icon {
				font-size: 1rem;
			}
		}

		.tournament-container {
			text-align: center;
		}

		.score-container {
			width: min(100%, 40rem);

			display: flex;
			justify-content: center;

			.teams {
				width: 100%;

				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				justify-content: center;
				align-items: center;
				gap: 1rem;

				.team {
					font-size: 1.15rem;
					color: inherit;
					text-decoration: none;

					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					gap: 0.75rem;

					img {
						height: 4rem;
					}
				}

				.score {
					font-size: 1.5rem;
					transform: translateY(-50%);
					display: flex;
					flex-direction: row;
					align-items: center;
					gap: 0.5rem;

					.divisor {
						font-size: 1rem;
					}
				}
			}
		}
	}

	.timeline-container {
		width: min(100%, 40rem);
		text-align: center;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 2rem;

		.empty-message {
			font-size: 0.9rem;
		}
	}
`;

interface EventCardContainerI {
	$primaryColor?: string;
	$secondaryColor?: string;
}

export const EventCardContainer = styled.div<EventCardContainerI>`
	width: 100%;
	border-radius: 1rem;
	overflow: hidden;
	white-space: nowrap;
	border: 1px solid ${(props) => props.theme.lightgray};
	filter: drop-shadow(0 0 0.5rem ${(props) => props.$primaryColor}AA);

	display: flex;
	flex-direction: column;

	.header {
		width: 100%;
		padding: 1rem;
		background-color: ${(props) => props.$primaryColor};
		color: ${(props) => props.$secondaryColor};
		font-weight: bold;

		display: flex;
		flex-direction: row;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.description {
		background-color: ${(props) => props.theme.white};
		padding: 1rem;
		width: 100%;

		display: flex;
		flex-direction: column;
		gap: 0.75rem;

		.title {
			font-weight: bold;
		}

		.data {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			gap: 0.75rem;
			row-gap: 0.25rem;
		}

		a {
			color: inherit;
		}

		.yellow {
			font-weight: bold;
			color: #cccc00;
		}

		.red {
			font-weight: bold;
			color: #ff0000;
		}
	}
`;
