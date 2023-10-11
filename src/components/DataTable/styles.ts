import styled from "styled-components";

export const TableContainer = styled.table`
	width: 100%;
	border: 1px solid ${(props) => props.theme.gray};
	border-spacing: 0;
	border-radius: 0.5rem;
	overflow: hidden;

	font-size: 0.85rem;
	color: ${(props) => props.theme.text};

	thead {
		background-color: ${(props) => props.theme.lightgray};

		th {
			padding: 0.75rem 1rem;
			font-weight: normal;
			text-align: left;
		}
	}

	tbody {
		background-color: ${(props) => props.theme.white};

		td {
			padding: 0.625rem 1rem;
			border-top: 1px solid ${(props) => props.theme.gray};
		}
	}
`;

export const TableRow = styled.tr``;

