import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Pages } from "@/routes";
import Loading from "@/components/Loading";
import PageNavigator from "@/components/PageNavigator";

import { TableEntity } from "./types";
import { DataTableContainer, TableContainer, Table } from "./styles";

interface TableHeaderI {
	header: string[];
	sortIndex: number;
	handleHeaderButtonClick: (value: number) => void;
}

function TableHeader(props: TableHeaderI) {
	return (
		<thead>
			<tr>
				{props.header.map((column, index) => (
					<th
						key={column}
						className={(props.sortIndex == index ? "selected" : "unselected") + (column == "" ? " min" : "")}>
						<button onClick={() => props.handleHeaderButtonClick(index)}>{column}</button>
					</th>
				))}
			</tr>
		</thead>
	);
}

interface TableBodyI {
	body: TableEntity[];
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
					{row.data.map((column, j) => (
						<td key={`${row.id}-${j}`}>
							{column.image ? <img src={column.image} alt={column.text.toString()} /> : <p>{column.text}</p>}
						</td>
					))}
				</tr>
			))}
		</tbody>
	);
}

interface TableProps {
	header: string[];
	body: TableEntity[];
	perpage: number;
	loading: boolean;
	sortIndex?: number;
	url?: Pages;
}

export default function DataTable(props: TableProps) {
	const [body, setBody] = useState<TableEntity[]>([]);
	const [intervalBody, setIntervalBody] = useState<TableEntity[]>([]);
	const [sortIndex, setSortIndex] = useState(props.sortIndex ?? 0);

	useEffect(() => {
		setBody(props.body);
	}, [props.body]);

	// Controls the interval that will be displayed in the actual page
	const [page, PageComponent] = PageNavigator({ length: body.length, max_per_page: props.perpage, interval: 1 });
	useEffect(() => {
		setIntervalBody(body.slice(props.perpage * (page - 1), Math.min(body.length, props.perpage * page)));
	}, [page, body, props]);

	// Controls Header interactions
	const handleHeaderButtonClick = (index: number) => {
		if (sortIndex != index) {
			// Sets a new sorting index
			setSortIndex(index);
		} else {
			// Reverse sorting
			setBody((body) => body.slice().reverse());
		}
	};

	// Triggers when component is rendered and when sorting index changes
	useEffect(() => {
		// Sort based on the desired column
		setBody((body) => [
			...body.sort((a, b) =>
				Object.values(a.data)[sortIndex].text.toString().localeCompare(Object.values(b.data)[sortIndex].text.toString())
			),
		]);
	}, [sortIndex]);

	return (
		<DataTableContainer>
			<TableContainer $loading={props.loading.toString()}>
				<Table $hasLink={props.url != undefined ? "true" : "false"}>
					<TableHeader header={props.header} sortIndex={sortIndex} handleHeaderButtonClick={handleHeaderButtonClick} />
					<TableBody body={intervalBody} url={props.url} />
				</Table>
				{props.loading && <Loading />}
			</TableContainer>
			<PageComponent />
		</DataTableContainer>
	);
}

