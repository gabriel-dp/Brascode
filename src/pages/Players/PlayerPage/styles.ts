import styled from "styled-components";

export const PlayerContainer = styled.div`
	width: 100%;
	padding: 1.5rem;
	border-radius: 0.5rem;
	background-color: ${(props) => props.theme.white};

	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	gap: 2rem;

	.bio-container {
		flex-grow: 1;
		max-width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		gap: 2rem;
		flex-wrap: wrap;
	}

	.bio-wrapper {
		flex-grow: 1;
		overflow-x: scroll;
		padding: 1rem 0;
	}

	.statistics-wrapper {
		flex-grow: 1;

		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;

		h2 {
			color: ${(props) => props.theme.primary};
		}
	}
`;

export const PlayerImageContainer = styled.div`
	border-radius: 0.5rem;
	overflow: hidden;

	img {
		&.player {
			max-height: 12rem;
			max-width: 12rem;
		}
	}
`;

interface StyleProps {
	$teamColor?: string;
}

export const BioContainer = styled.div<StyleProps>`
	flex-grow: 1;
	min-width: 18rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 0.125rem;

	.main {
		white-space: nowrap;
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		.name {
			font-size: 1rem;
		}

		.nick {
			color: ${(props) => props.theme.primary};
			font-size: 2rem;
			font-weight: bold;
		}

		.country {
			max-height: 1.5rem;
			transform: translateY(25%);
		}

		.team {
			display: flex;
			flex-direction: row;
			align-items: center;

			gap: 0.5rem;
			margin-left: 2rem;

			p {
				font-size: 1.25rem;
				font-weight: bold;
				color: ${(props) => props.$teamColor ?? props.theme.text};
			}

			img {
				max-height: 3rem;
			}
		}
	}

	hr {
		margin: 1rem 0;
		color: ${(props) => props.theme.lightgray};
	}

	.data {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		gap: 2.5rem;
		flex-wrap: wrap;
	}
`;

export const DataContainer = styled.div<StyleProps>`
	display: flex;
	flex-direction: column;

	.title {
		font-weight: bold;
		color: ${(props) => props.$teamColor ?? props.theme.primary};
	}
`;

