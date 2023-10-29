import styled from "styled-components";

export const DataTableContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

interface TableContainerI {
	$loading: string;
}

export const TableContainer = styled.div<TableContainerI>`
	width: 100%;
	min-height: ${(props) => (props.$loading == "true" ? "7rem" : "none")};
	border: 1px solid ${(props) => props.theme.gray};
	border-radius: 0.5rem;
	overflow-x: auto;
	overflow-y: ${(props) => (props.$loading == "true" ? "hidden" : "auto")};

	display: flex;
	flex-direction: column;
	align-items: ${(props) => (props.$loading == "true" ? "center" : "flex-start")};
	justify-content: space-between;
`;

interface TableI {
	$hasLink: string;
}

export const Table = styled.table<TableI>`
	width: max(100%, 25rem);
	border-spacing: 0;
	font-size: 0.85rem;
	color: ${(props) => props.theme.text};

	thead {
		width: 100%;
		background-color: ${(props) => props.theme.lightgray};

		th {
			text-align: left;

			button {
				font-weight: bold;
				color: ${(props) => props.theme.text};
				padding: 0.75rem 1rem;
				border: none;
				background-color: transparent;
				height: 100%;
				cursor: pointer;
			}

			&.selected {
				button {
					text-decoration: underline;
				}
			}

			&.min {
				width: 0;
				button {
					display: none;
				}
			}
		}
	}

	tbody {
		width: 100%;
		background-color: ${(props) => props.theme.white};

		tr {
			cursor: ${(props) => (props.$hasLink == "true" ? "pointer" : "default")};
			transition: background 0.25s ease;
			&:hover {
				background-color: ${(props) => props.theme.primaryHighlight}55;
			}
		}

		td {
			padding: 0.625rem 1rem;
			border-top: 1px solid ${(props) => props.theme.gray};

			img {
				max-height: 1.25rem;
			}
		}
	}

	@media (max-width: 480px) {
		font-size: 0.75rem;
	}
`;

