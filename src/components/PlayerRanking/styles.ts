import styled from "styled-components";

export const RankingContainer = styled.div`
	width: 100%;
	padding: 1rem;
	border-radius: 0.5rem;
	background-color: ${(props) => props.theme.white};
	border: 1px solid ${(props) => props.theme.gray};

	display: flex;
	flex-direction: column;
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
		display: flex;
		flex-direction: column;
		align-items: center;
	}
`;

export const PlayerCardContainer = styled.div`
	width: 100%;
	padding: 0.5rem 1rem;

	display: flex;
	flex-direction: row;
`;

