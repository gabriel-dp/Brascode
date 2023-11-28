import styled from "styled-components";

export const RankingContainer = styled.div`
	width: 100%;
	padding: 1rem;
	border-radius: 0.5rem;
	background-color: ${(props) => props.theme.white};
	border: 1px solid ${(props) => props.theme.gray};
	overflow-x: auto;

	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	gap: 1rem;

	.title {
		p {
			max-width: 100%;
			font-size: 1.25rem;
			font-weight: bold;
			color: ${(props) => props.theme.primary};
		}
	}

	.players {
		min-width: 20rem;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
`;

export const PlayerCardContainer = styled.div`
	width: 100%;
	padding: 0.5rem 1rem;
	transition: all 0.25s ease-in-out;

	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 1rem;

	&:hover {
		border-radius: 0.5rem;
		background-color: ${(props) => props.theme.primaryHighlight}55;
	}

	a {
		color: inherit;
		text-decoration: none;
		height: 100%;
		width: 100%;
	}

	.position {
		font-size: 1.25rem;
		font-weight: bold;
	}

	.quantity {
		font-size: 1.15rem;
		font-weight: bold;
	}

	.player {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1rem;

		.image {
			height: 3rem;
			border-radius: 100rem;
			overflow: hidden;

			img {
				max-height: 100%;
				max-width: 100%;
			}
		}
	}
`;
