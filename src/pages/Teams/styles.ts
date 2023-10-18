import styled from "styled-components";

export const TeamsContainer = styled.div`
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

	&.team {
		width: min(100%, 15rem);
	}

	&.tournament {
		width: min(100%, 15rem);
	}
`;

