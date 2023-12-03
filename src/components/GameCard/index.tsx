import { useNavigate } from "react-router-dom";

import { Pages } from "@/routes";
import { useFetchData } from "@/hooks/useFetchData";
import { GameI } from "@/types/game";
import { TeamI } from "@/types/team";
import { ApiRequest } from "@/utils/requests";
import { formatDateToDDMMYYYY, formatDateToHHmm } from "@/utils/dates";

import { CardContainer } from "./styles";

interface GameCardI {
	game: GameI;
	refScroll: React.MutableRefObject<HTMLDivElement | null> | null;
}

export default function GameCard(props: GameCardI) {
	// Request data of both teams
	const { data: dataHome } = useFetchData<TeamI>(ApiRequest.getUrlById("teams", props.game.time_casa));
	const { data: dataAway } = useFetchData<TeamI>(ApiRequest.getUrlById("teams", props.game.time_visitante));

	// Calculates the score if the game already started
	const timeNow = new Date(),
		timeStart = new Date(props.game.data_hora_inicio),
		started = timeNow.getTime() > timeStart.getTime();

	const scoreHome = started ? props.game.gols.filter((goal) => goal.time_marcou == props.game.time_casa).length : "-";
	const scoreAway = started
		? props.game.gols.filter((goal) => goal.time_marcou == props.game.time_visitante).length
		: "-";

	// Redirects to game page on click
	const navigate = useNavigate();
	const handleCardClick = () => {
		navigate(Pages.Games + props.game.id);
	};

	return (
		<CardContainer onClick={handleCardClick} ref={props.refScroll}>
			<div className="description">
				<div className="time">
					<p>{formatDateToHHmm(props.game.data_hora_inicio)}</p>
				</div>
			</div>
			<div className="teams">
				<div className="team">
					<img src={dataHome?.imagem} alt={dataHome?.id.toString()} />
					<p>{dataHome?.abreviacao}</p>
					<p className="score">{scoreHome}</p>
				</div>
				<p>X</p>
				<div className="team">
					<p className="score">{scoreAway}</p>
					<p>{dataAway?.abreviacao}</p>
					<img src={dataAway?.imagem} alt={dataAway?.id.toString()} />
				</div>
			</div>
			<div className="description">
				<div className="time">
					<p>{formatDateToDDMMYYYY(props.game.data_hora_inicio)}</p>
				</div>
			</div>
		</CardContainer>
	);
}
