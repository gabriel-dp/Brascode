import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MdAccessTimeFilled, MdCalendarMonth, MdPlace } from "react-icons/md";

import { Pages } from "@/routes";
import { useFetchData } from "@/hooks/useFetchData";
import { ApiRequest } from "@/utils/requests";
import { formatDateToDDMMYYYY, formatDateToHHmm } from "@/utils/dates";
import { CardColor, CardI, GameI, GoalI } from "@/types/game";
import { TeamI } from "@/types/team";
import { TournamentI } from "@/types/tournament";

import { EventCardContainer, GameContainer } from "./styles";

enum Event {
	Goal,
	Card,
}

interface EventI<T> {
	event: T;
	teams: TeamI[];
}

function EventGoal(props: EventI<GoalI>) {
	const teamAuthor: TeamI | undefined = props.teams.find((team) => team.id == props.event.teamIdAuthor);
	const primaryColor: string | undefined = teamAuthor?.colors?.primary;
	const secondaryColor: string | undefined = teamAuthor?.colors?.secondary;

	return (
		<EventCardContainer $primaryColor={primaryColor} $secondaryColor={secondaryColor}>
			<div className="header">
				<p>Gooool!</p>
				<p>{props.event.time}&quot;</p>
			</div>
			<div className="description">
				<div className="data">
					<p>{teamAuthor?.name} + 1</p>
				</div>
				<div className="data">
					<p className="title">Autor:</p>
					<Link to={Pages.Players + props.event.playerIdAuthor.toString()}>
						<p>Pedro Machado #10</p>
					</Link>
					{props.event.isOwn && <p>(Contra)</p>}
				</div>
				{props.event.playerIdAssist && (
					<div className="data">
						<p className="title">Assistência:</p>
						<Link to={Pages.Players + props.event.playerIdAssist.toString()}>
							<p>Gabriel de Paula #23</p>
						</Link>
					</div>
				)}
			</div>
		</EventCardContainer>
	);
}

function EventCard(props: EventI<CardI>) {
	const team: TeamI | undefined = props.teams.find((team) => team.id == props.event.teamId);
	const primaryColor: string | undefined = team?.colors?.primary;
	const secondaryColor: string | undefined = team?.colors?.secondary;

	return (
		<EventCardContainer $primaryColor={primaryColor} $secondaryColor={secondaryColor}>
			<div className="header">
				<p>Punição!</p>
				<p>{props.event.time}&quot;</p>
			</div>
			<div className="description">
				<div className="data">
					{props.event.color == CardColor.Red ? (
						<p className="red">Cartão vermelho</p>
					) : (
						<p className="yellow">Cartão amarelo</p>
					)}
					<p>({team?.name})</p>
				</div>
				{props.event.playerId && (
					<div className="data">
						<p className="title">Jogador:</p>
						<Link to={Pages.Players + props.event.playerId.toString()}>
							<p>Pedro Machado #10</p>
						</Link>
					</div>
				)}
			</div>
		</EventCardContainer>
	);
}

export default function GamePage() {
	// Get id from url
	const { id } = useParams();

	// Requests
	const { data: dataGame } = useFetchData<GameI>(ApiRequest.getUrlById("games", id ?? 0));
	const { data: dataTeamHome } = useFetchData<TeamI>(
		ApiRequest.getUrlById("teams", dataGame?.teamIdHome ?? 0),
		{},
		dataGame != undefined
	);
	const { data: dataTeamAway } = useFetchData<TeamI>(
		ApiRequest.getUrlById("teams", dataGame?.teamIdAway ?? 0),
		{},
		dataGame != undefined
	);
	const { data: dataTournament } = useFetchData<TournamentI>(
		ApiRequest.getUrlById("tournaments", dataGame?.tournamentId ?? 0),
		{},
		dataGame != undefined
	);

	// Get goals of team home and away
	const [goalsHome, setGoalsHome] = useState<GoalI[]>([]);
	const [goalsAway, setGoalsAway] = useState<GoalI[]>([]);
	useEffect(() => {
		if (!dataGame || !dataTeamHome || !dataTeamAway) return;
		setGoalsHome(dataGame.goals.filter((goal) => goal.teamIdAuthor == dataTeamHome.id));
		setGoalsAway(dataGame.goals.filter((goal) => goal.teamIdAuthor == dataTeamAway.id));
	}, [dataGame, dataTeamHome, dataTeamAway]);

	// Create game facts timeline
	const [timeline, setTimeline] = useState<{ type: Event; data: GoalI | CardI }[]>([]);
	useEffect(() => {
		if (!dataGame) return;
		setTimeline(
			[
				...dataGame.cards.map((card) => ({
					type: Event.Card,
					data: card,
				})),
				...dataGame.goals.map((goal) => ({
					type: Event.Goal,
					data: goal,
				})),
			].sort((a, b) => a.data.time.toString().localeCompare(b.data.time.toString()))
		);
	}, [dataGame]);

	return (
		<GameContainer>
			<div className="description-container">
				<div className="tournament-container">
					<p>{dataTournament?.name}</p>
				</div>
				<div className="score-container">
					{dataGame && (
						<div className="teams">
							<Link className="team" to={Pages.Teams + dataTeamHome?.id.toString()}>
								<img src={dataTeamHome?.image} />
								<p>{dataTeamHome?.abbreviation}</p>
							</Link>
							<div className="score">
								<p>{goalsHome.length}</p>
								<p className="divisor">X</p>
								<p>{goalsAway.length}</p>
							</div>
							<Link className="team" to={Pages.Teams + dataTeamAway?.id.toString()}>
								<img src={dataTeamAway?.image} />
								<p>{dataTeamAway?.abbreviation}</p>
							</Link>
						</div>
					)}
				</div>
				<div className="data">
					<MdPlace className="icon" />
					<p>{dataGame?.local}</p>
				</div>
				<div className="data">
					<MdCalendarMonth className="icon" />
					<p>{formatDateToDDMMYYYY(dataGame?.start ?? "")}</p>
				</div>
				<div className="data">
					<MdAccessTimeFilled className="icon" />
					<p>{formatDateToHHmm(dataGame?.start ?? "")}</p>
				</div>
			</div>
			<div className="timeline-container">
				<h2>Linha do tempo</h2>
				{timeline.length > 0 && dataTeamHome && dataTeamAway ? (
					timeline.map((event) =>
						event.type == Event.Goal ? (
							<EventGoal key={event.data.id} event={event.data as GoalI} teams={[dataTeamHome, dataTeamAway]} />
						) : (
							<EventCard key={event.data.id} event={event.data as CardI} teams={[dataTeamHome, dataTeamAway]} />
						)
					)
				) : (
					<p className="empty-message">Não há registro de Gols e Cartões</p>
				)}
			</div>
		</GameContainer>
	);
}
