import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Pages } from "@/routes";
import Loading from "@/components/Loading";
import PageNavigator from "@/components/PageNavigator";

import { TableColumn, TableRow } from "./types";
import { DataTableContainer, TableContainer, Table, DirectionArrow } from "./styles";

enum sortDirectionEnum {
	Ascending,
	Descending,
}

interface TableHeaderI {
	header: TableColumn[];
	sortIndex: number;
	sortDirection: sortDirectionEnum;
	handleHeaderButtonClick: (value: number) => void;
}

function TableHeader(props: TableHeaderI) {
	return (
		<thead>
			<tr>
				{props.header.map((column, index) => (
					<th
						key={column.text + index}
						className={(props.sortIndex == index ? "selected" : "unselected") + (column.text == "" ? " min" : "")}>
						<button onClick={() => props.handleHeaderButtonClick(index)} title={column.tooltip}>
							{column.text}
							{props.sortIndex == index && (
								<DirectionArrow $ascending={props.sortDirection == sortDirectionEnum.Ascending ? "true" : "false"} />
							)}
						</button>
					</th>
				))}
			</tr>
		</thead>
	);
}

interface TableBodyI {
	body: TableRow[];
	url?: string;
}

function TableBody(props: TableBodyI) {
	const navigate = useNavigate();
	const handleRowClick = (id: string | number) => {
		if (props.url != undefined) navigate(props.url + id.toString());
	};

	return (
		<tbody>
			{props.body.map((row) => (
				<tr key={row.id} onClick={() => handleRowClick(row.id)}>
					{row.data.map((column, j) => {
						return (
							<td key={`${row.id}-${j}`}>
								{column.imagem ? <img src={column.imagem} alt={column.text.toString()} /> : <p>{column.text}</p>}
							</td>
						);
					})}
				</tr>
			))}
		</tbody>
	);
}

interface TableProps {
	header: TableColumn[];
	body: TableRow[];
	perpage: number;
	loading: boolean;
	sortIndex?: number;
	url?: Pages;
}

function sortBody(a: TableRow, b: TableRow, sortIndex: number) {
	const dataA = Object.values(a.data)[sortIndex].text,
		dataB = Object.values(b.data)[sortIndex].text;
	if (typeof dataA == "number" && typeof dataB == "number") {
		return dataA == dataB ? 0 : dataA < dataB ? -1 : 1;
	} else {
		return dataA?.toString().localeCompare(dataB?.toString());
	}
}

export default function DataTable(props: TableProps) {
	const [body, setBody] = useState<TableRow[]>([]);
	const [intervalBody, setIntervalBody] = useState<TableRow[]>([]);
	const [sortIndex, setSortIndex] = useState(props.sortIndex ?? 0);
	const [sortDirection, setSortDirection] = useState(sortDirectionEnum.Ascending);

	// Sort body when component is rendered and when sorting index changes
	useEffect(() => {
		setBody((body) => [
			...(props.body.length != body.length ? props.body : body).sort((a, b) => sortBody(a, b, sortIndex)),
		]);
	}, [props.body, sortIndex]);

	// Controls the interval that will be displayed in the actual page
	const [page, PageComponent] = PageNavigator({
		length: body.length,
		max_per_page: props.perpage,
		interval: 1,
		body: body,
	});
	useEffect(() => {
		setIntervalBody(body.slice(props.perpage * (page - 1), Math.min(body.length, props.perpage * page)));
	}, [page, body, props]);

	// Controls Header interactions
	const handleHeaderButtonClick = (index: number) => {
		if (sortIndex != index) {
			// Sets a new sorting index
			setSortIndex(index);
			setSortDirection(sortDirectionEnum.Ascending);
		} else {
			// Reverse sorting
			setBody((body) => body.slice().reverse());
			setSortDirection((actual) =>
				actual == sortDirectionEnum.Ascending ? sortDirectionEnum.Descending : sortDirectionEnum.Ascending
			);
		}
	};

	return (
		<DataTableContainer>
			<TableContainer $loading={props.loading.toString()}>
				<Table $hasLink={props.url != undefined ? "true" : "false"}>
					<TableHeader
						header={props.header}
						sortIndex={sortIndex}
						handleHeaderButtonClick={handleHeaderButtonClick}
						sortDirection={sortDirection}
					/>
					<TableBody body={intervalBody} url={props.url} />
				</Table>
				{props.loading && <Loading />}
			</TableContainer>
			<PageComponent />
		</DataTableContainer>
	);
}
