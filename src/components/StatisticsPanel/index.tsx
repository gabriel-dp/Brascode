import { IconType } from "react-icons";
import { MdSportsSoccer, MdHandshake } from "react-icons/md";

import { CounterElement, StatisticsContainer, Card } from "./styles";

interface CounterI {
	data: number;
}

interface Statistics {
	goalsScored?: CounterI;
	goalsAssisted?: CounterI;
	cardsYellow?: CounterI;
	cardsRed?: CounterI;
}

interface CounterIcon {
	title: string;
	icon: IconType;
	iconColor?: string;
}

const ICONS_STATISTICS: { [key in keyof Statistics]: CounterIcon } = {
	goalsScored: {
		title: "Gols",
		icon: MdSportsSoccer,
	},
	goalsAssisted: {
		title: "Assistências",
		icon: MdHandshake,
	},
	cardsYellow: {
		title: "Cartões Amarelos",
		icon: Card,
		iconColor: "#EEEE00",
	},
	cardsRed: {
		title: "Cartões Vermelhos",
		icon: Card,
		iconColor: "#FF0000",
	},
};

function Counter(props: { name: string; counter: CounterI }) {
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
				console.log(obj);
				if (obj == undefined) return <></>;
				else return <Counter key={s} name={s} counter={{ data: obj.data }} />;
			})}
		</StatisticsContainer>
	);
}

