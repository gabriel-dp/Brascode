import styled from "styled-components";

export const PlayersContainer = styled.div`
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
`;

export const Filter = styled.div`
	height: 2.5rem;
	flex-grow: 1;

	&.player {
		width: min(100%, 15rem);
	}

	&.team {
		width: min(100%, 15rem);
	}
`;

