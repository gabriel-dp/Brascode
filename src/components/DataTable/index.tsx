import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { TableEntity } from "@/utils/types";
import PageNavigator from "@/components/PageNavigator";

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

function TableBody(props: { body: TableEntity[] }) {
	const navigate = useNavigate();
	const handleRowClick = (id: string | number) => {
		navigate(id.toString());
	};

	return (
		<tbody>
			{props.body.map((row) => (
				<tr key={row.id} onClick={() => handleRowClick(row.id)}>
					{row.data.map((column, j) => (
						<td key={column[j]}>{column}</td>
					))}
				</tr>
			))}
		</tbody>
	);
}

interface TableProps {
	header: string[];
	body: TableEntity[];
	sortIndex?: number;
}

export default function DataTable(props: TableProps) {
	const [sortIndex, setSortIndex] = useState(props.sortIndex ?? 0);
	const [body, setBody] = useState(props.body);
	const [intervalBody, setIntervalBody] = useState<typeof body>([]);

	const MAX_PAGE_LENGTH = 20;
	const [page, PageComponent] = PageNavigator({ length: body.length, max_per_page: MAX_PAGE_LENGTH, interval: 1 });

	// Controls the interval that will be displayed in the actual page
	useEffect(() => {
		setIntervalBody(body.slice(MAX_PAGE_LENGTH * (page - 1), Math.min(body.length, MAX_PAGE_LENGTH * page)));
	}, [page, body]);

	// Controls Header interactions
	const handleHeaderButtonClick = (index: number) => {
		let newBody: typeof body;
		if (sortIndex != index) {
			// Sort based on the desired column
			newBody = [...body.sort((a, b) => a.data[index].localeCompare(b.data[index]))];
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

