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
	const { data: dataHome } = useFetchData<TeamI>(ApiRequest.getUrlById("teams", props.game.teamIdHome));
	const { data: dataAway } = useFetchData<TeamI>(ApiRequest.getUrlById("teams", props.game.teamIdAway));

	// Calculates the score if the game already started
	const timeNow = new Date(),
		timeStart = new Date(props.game.start),
		started = timeNow.getTime() > timeStart.getTime();

	const scoreHome = started
		? props.game.goals.filter((goal) => goal.teamIdAuthor == props.game.teamIdHome).length
		: "-";
	const scoreAway = started
		? props.game.goals.filter((goal) => goal.teamIdAuthor == props.game.teamIdAway).length
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
					<p>{formatDateToHHmm(props.game.start)}</p>
				</div>
			</div>
			<div className="teams">
				<div className="team">
					<img src={dataHome?.image} />
					<p>{dataHome?.abbreviation}</p>
					<p className="score">{scoreHome}</p>
				</div>
				<p>X</p>
				<div className="team">
					<p className="score">{scoreAway}</p>
					<p>{dataAway?.abbreviation}</p>
					<img src={dataAway?.image} />
				</div>
			</div>
			<div className="description">
				<div className="time">
					<p>{formatDateToDDMMYYYY(props.game.start)}</p>
				</div>
			</div>
		</CardContainer>
	);
}

