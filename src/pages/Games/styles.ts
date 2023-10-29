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
		width: min(100%, 40rem);
	}

	&.nextgame {
		width: min(100%, 13rem);
	}
`;

export const FilterButton = styled.button`
	width: 100%;
	height: 100%;
	padding: 0 1rem;
	background-color: ${(props) => props.theme.primary};
	color: ${(props) => props.theme.primaryText};
	border: none;
	border-radius: 100rem;
	cursor: pointer;
	transition: all ease-in-out 0.25s;
	text-overflow: ellipsis;
	white-space: nowrap;

	display: flex;
	justify-content: center;
	align-items: center;

	&:hover {
		background-color: ${(props) => props.theme.primaryHighlight};
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
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
		gap: 1rem;

		> div {
			width: 100%;
			margin: auto;
		}
	}
`;

