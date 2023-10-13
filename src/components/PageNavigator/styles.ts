import styled from "styled-components";

export const NavigatorContainer = styled.div`
	margin: 1.5rem 0;
	display: flex;
	flex-direction: row;
	gap: 0.25rem;

	button {
		border: none;
		cursor: pointer;

		&.number {
			padding: 0.5rem 0.75rem;
			border-radius: 100rem;
			background-color: ${(props) => props.theme.white};
			border: 1px solid ${(props) => props.theme.primary};
			color: ${(props) => props.theme.primary};
			transition: all 0.25s ease;

			&:hover,
			&.actual {
				background-color: ${(props) => props.theme.primary} !important;
				color: ${(props) => props.theme.primaryText} !important;
			}
		}

		&.navigator {
			padding: 0.5rem 0.75rem;
			background-color: transparent;
			color: ${(props) => props.theme.primary};
			font-weight: bold;

			&.disabled {
				cursor: auto;
				color: transparent !important;
			}
		}
	}
`;

