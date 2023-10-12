import styled from "styled-components";

export const TableContainer = styled.div`
	width: 100%;
	border: 1px solid ${(props) => props.theme.gray};
	border-radius: 0.5rem;
	overflow-x: scroll;
`;

export const Table = styled.table`
	width: max(100%, 25rem);
	border-spacing: 0;
	font-size: 0.85rem;
	color: ${(props) => props.theme.text};

	thead {
		width: 100%;
		background-color: ${(props) => props.theme.lightgray};

		th {
			padding: 0.75rem 1rem;
			font-weight: normal;
			text-align: left;
		}
	}

	tbody {
		width: 100%;
		background-color: ${(props) => props.theme.white};

		td {
			padding: 0.625rem 1rem;
			border-top: 1px solid ${(props) => props.theme.gray};
		}
	}

	* {
		transition: all 0.25s ease-in-out;
	}

	@media (max-width: 480px) {
		font-size: 0.75rem;
	}
`;

