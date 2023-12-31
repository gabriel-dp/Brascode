import { Id } from "@/types/entity";
import { Statistics, StatisticsPlayerI } from "@/types/player";

import { ICONS_STATISTICS } from "./types";
import { CounterElement, StatisticsContainer } from "./styles";
import { FetchStatus, useFetchData } from "@/hooks/useFetchData";
import { ApiRequest } from "@/utils/requests";
import Loading from "../Loading";
import { useEffect, useState } from "react";

function Counter(props: { name: string; counter: number }) {
	const findedIcon = ICONS_STATISTICS[props.name as keyof Statistics];
	const CounterIcon = findedIcon?.icon;

	return (
		<CounterElement $iconColor={findedIcon?.iconColor}>
			{CounterIcon && <CounterIcon className="icon" />}
			<p className="data">{props.counter}</p>
			<p className="title">{findedIcon?.title}</p>
		</CounterElement>
	);
}

interface StatisticsPanelI {
	tournamentId: Id;
	playerId: Id;
}

export default function StatisticsPanel(props: StatisticsPanelI) {
	const [counters, setCounters] = useState<JSX.Element[]>([]);

	const { data: dataStatistics, status: StatusStatistics } = useFetchData<StatisticsPlayerI>(
		ApiRequest.getUrlById(`statistics/${props.tournamentId}`, props.playerId)
	);

	useEffect(() => {
		if (dataStatistics == null) {
			setCounters([]);
			return;
		}
		setCounters([
			<Counter key="Gols" name="gols" counter={dataStatistics.gols} />,
			<Counter key="Assistências" name="assistencia" counter={dataStatistics.assistencia} />,
			<Counter key="Cartões Amarelos" name="cartao_amarelo" counter={dataStatistics.cartao_amarelo} />,
			<Counter key="Cartões Vermelhos" name="cartao_vermelho" counter={dataStatistics.cartao_vermelho} />,
		]);
	}, [dataStatistics]);

	return (
		<StatisticsContainer>
			{StatusStatistics != FetchStatus.Success && <Loading />}
			{dataStatistics && counters.map((counter) => counter)}
		</StatisticsContainer>
	);
}
