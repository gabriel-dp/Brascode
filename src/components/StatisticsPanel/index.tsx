import { CounterData, Statistics, ICONS_STATISTICS } from "./types";
import { CounterElement, StatisticsContainer } from "./styles";

function Counter(props: { name: string; counter: CounterData }) {
	const findedIcon = ICONS_STATISTICS[props.name as keyof Statistics];
	const CounterIcon = findedIcon?.icon;

	return (
		<CounterElement $iconColor={findedIcon?.iconColor}>
			{CounterIcon && <CounterIcon className="icon" />}
			<p className="data">{props.counter.data}</p>
			<p className="title">{findedIcon?.title}</p>
		</CounterElement>
	);
}

interface StatisticsPanelI {
	statistics: Statistics;
}

export default function StatisticsPanel(props: StatisticsPanelI) {
	return (
		<StatisticsContainer>
			{Object.keys(props.statistics).map((s) => {
				const obj = props.statistics[s as keyof Statistics];
				if (obj == undefined) return <></>;
				else return <Counter key={s} name={s} counter={{ data: obj.data }} />;
			})}
		</StatisticsContainer>
	);
}

