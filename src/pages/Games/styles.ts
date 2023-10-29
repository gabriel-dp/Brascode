import styled from "styled-components";

export const GamesContainer = styled.div`
	width: 100%;

	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

export const FilterContainer = styled.div`
	width: 100%;

	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 1rem;
	row-gap: 0.5rem;
`;

export const Filter = styled.div`
	height: 2.5rem;
	flex-grow: 1;

	&.tournament {
		width: min(100%, 15rem);
	}
`;

export const CardsContainer = styled.div`
	width: 100%;
	padding: 1rem 0;
	overflow-x: auto;

	display: flex;
	flex-direction: column;
	justify-content: centerfle;

	.cards {
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 1rem;

		> div {
			flex-grow: 1;
			margin: auto;
		}
	}
`;

