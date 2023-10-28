import styled from "styled-components";

interface StyleProps {
	$teamColor?: string;
}

export const TeamContainer = styled.div<StyleProps>`
	width: 100%;
	padding: 2.5rem 1.5rem;
	border-radius: 0.5rem;
	background-color: ${(props) => props.theme.white};

	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	gap: 3rem;

	h2 {
		color: ${(props) => props.$teamColor ?? props.theme.primary};
	}

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
		overflow-x: auto;
		padding: 1rem 0;
	}

	.roster-container {
		width: 100%;

		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.statistics-wrapper {
		flex-grow: 1;
		max-width: 100%;

		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
	}
`;

export const TeamImageContainer = styled.div`
	overflow: hidden;

	img {
		&.team {
			max-height: 12rem;
			max-width: 12rem;
			height: 12rem;
		}
	}
`;

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

		.abbreviation {
			font-size: 1rem;
		}

		.name {
			color: ${(props) => props.$teamColor};
			font-size: 2rem;
			font-weight: bold;
		}

		.country {
			max-height: 1.5rem;
			transform: translateY(25%);
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

		.title {
			color: ${(props) => props.$teamColor ?? props.theme.primary};
		}
	}
`;

export const DataContainer = styled.div<StyleProps>`
	display: flex;
	flex-direction: column;
	align-items: center;

	.title {
		font-weight: bold;
		color: ${(props) => props.$teamColor ?? props.theme.primary};
	}
`;

export const FilterContainer = styled.div`
	width: min(100%, 30rem);
	height: 2.5rem;

	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 1rem;
	row-gap: 0.5rem;
`;

