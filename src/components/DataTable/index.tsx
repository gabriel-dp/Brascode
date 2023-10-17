import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
					<th key={column} className={props.sortIndex == index ? "selected" : "unselected"}>
						<button onClick={() => props.handleHeaderButtonClick(index)}>{column}</button>
					</th>
				))}
			</tr>
		</thead>
	);
}

interface TableBodyI {
	body: TableEntity[];
}

function TableBody(props: TableBodyI) {
	const navigate = useNavigate();
	const handleRowClick = (id: string | number) => {
		navigate(id.toString());
	};

	return (
		<tbody>
			{props.body.map((row) => (
				<tr key={row.id} onClick={() => handleRowClick(row.id)}>
					{Object.values(row.data).map((column, j) => (
						<td key={column[j]}>
							<p>{column}</p>
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
	sortIndex?: number;
}

export default function DataTable(props: TableProps) {
	const [body, setBody] = useState(props.body);
	const [intervalBody, setIntervalBody] = useState<typeof body>([]);
	const [sortIndex, setSortIndex] = useState(props.sortIndex ?? 0);

	// Controls the interval that will be displayed in the actual page
	const [page, PageComponent] = PageNavigator({ length: body.length, max_per_page: props.perpage, interval: 1 });
	useEffect(() => {
		console.log(body.slice(props.perpage * (page - 1), Math.min(body.length, props.perpage * page)));
		setIntervalBody(body.slice(props.perpage * (page - 1), Math.min(body.length, props.perpage * page)));
	}, [page, body, props]);

	// Controls Header interactions
	const handleHeaderButtonClick = (index: number) => {
		let newBody: typeof body;
		if (sortIndex != index) {
			// Sort based on the desired column
			newBody = [...body.sort((a, b) => Object.values(a.data)[index].localeCompare(Object.values(b.data)[index]))];
			setSortIndex(index);
		} else {
			// Reverse sorting
			newBody = body.slice().reverse();
		}
		setBody(newBody);
	};

	return (
		<DataTableContainer>
			<TableContainer>
				<Table>
					<TableHeader header={props.header} sortIndex={sortIndex} handleHeaderButtonClick={handleHeaderButtonClick} />
					<TableBody body={intervalBody} />
				</Table>
			</TableContainer>
			<PageComponent />
		</DataTableContainer>
	);
}

