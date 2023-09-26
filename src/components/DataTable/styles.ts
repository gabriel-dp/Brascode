import styled from "styled-components";

export const TableContainer = styled.table`
	width: 100%;
	border: 1px solid ${(props) => props.theme.primary};
	border-spacing: 0;

	thead {
		th {
			font-size: 1rem;
			padding: 0.5rem 1rem;
			background-color: ${(props) => props.theme.primary};
			color: ${(props) => props.theme.primaryText};
			text-align: left;
		}
	}

	tbody {
		background-color: ${(props) => props.theme.white};

		font-size: 0.85rem;

		td {
			padding: 0.5rem 1rem;
		}
	}
`;

export const TableRow = styled.tr``;

