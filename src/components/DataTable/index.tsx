import { TableContainer } from "./styles";

export function TableHeader(props: { header: string[] }) {
	return (
		<thead>
			<tr>
				{props.header.map((column) => (
					<th key={column}>{column}</th>
				))}
			</tr>
		</thead>
	);
}

export function TableBody(props: { body: string[][] }) {
	return (
		<tbody>
			{props.body.map((row, i) => (
				<tr key={row[i]}>
					{row.map((column, j) => (
						<td key={column[j]}>{column}</td>
					))}
				</tr>
			))}
		</tbody>
	);
}

interface TableProps {
	header: string[];
	body: string[][];
}

export default function DataTable(props: TableProps) {
	return (
		<TableContainer>
			<TableHeader header={props.header} />
			<TableBody body={props.body} />
		</TableContainer>
	);
}

