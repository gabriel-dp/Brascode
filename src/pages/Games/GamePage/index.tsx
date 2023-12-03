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
import { PlayerI } from "@/types/player";

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
	const teamAuthor: TeamI | undefined = props.teams.find((team) => team.id == props.event.time_marcou);
	const primaryColor: string | undefined = teamAuthor?.cor_primaria?.toString();
	const secondaryColor: string | undefined = teamAuthor?.cor_secundaria?.toString();

	const { data: dataAuthor } = useFetchData<PlayerI>(ApiRequest.getUrlById("players", props.event.jogador));
	const { data: dataAssist } = useFetchData<PlayerI>(ApiRequest.getUrlById("players", props.event.assistido ?? -1));

	return (
		<EventCardContainer $primaryColor={primaryColor} $secondaryColor={secondaryColor}>
			<div className="header">
				<p>Gooool!</p>
				<p>
					{props.event.tempo.split(":")[0]}+{props.event.tempo_acrescimo.split(":")[0]}&quot;
				</p>
			</div>
			<div className="description">
				<div className="data">
					<p>{teamAuthor?.nome} + 1</p>
				</div>
				<div className="data">
					<p className="title">Autor:</p>
					<Link to={Pages.Players + props.event.jogador.toString()}>
						<p>
							{dataAuthor?.nome} ({dataAuthor?.numero_camisa})
						</p>
					</Link>
					{props.event.foi_contra && <p>(Contra)</p>}
				</div>
				{props.event.assistido && (
					<div className="data">
						<p className="title">Assistência:</p>
						<Link to={Pages.Players + props.event.assistido.toString()}>
							<p>
								{dataAssist?.nome} ({dataAssist?.numero_camisa})
							</p>
						</Link>
					</div>
				)}
			</div>
		</EventCardContainer>
	);
}

function EventCard(props: EventI<CardI>) {
	const team: TeamI | undefined = props.teams.find((team) => team.id == props.event.time);
	const primaryColor: string | undefined = team?.cor_primaria?.toString();
	const secondaryColor: string | undefined = team?.cor_secundaria?.toString();

	const { data: dataPlayer } = useFetchData<PlayerI>(ApiRequest.getUrlById("players", props.event.jogador ?? -1));

	return (
		<EventCardContainer $primaryColor={primaryColor} $secondaryColor={secondaryColor}>
			<div className="header">
				<p>Punição!</p>
				<p>
					{props.event.tempo.split(":")[0]}+{props.event.tempo_acrescimo.split(":")[0]}&quot;
				</p>
			</div>
			<div className="description">
				<div className="data">
					{props.event.tipo == CardColor.Red ? (
						<p className="red">Cartão vermelho</p>
					) : (
						<p className="yellow">Cartão amarelo</p>
					)}
					<p>({team?.nome})</p>
				</div>
				{props.event.jogador && (
					<div className="data">
						<p className="title">Jogador:</p>
						<Link to={Pages.Players + props.event.jogador.toString()}>
							<p>
								{dataPlayer?.nome} ({dataPlayer?.numero_camisa})
							</p>
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
		ApiRequest.getUrlById("teams", dataGame?.time_casa ?? 0),
		{},
		dataGame != undefined
	);
	const { data: dataTeamAway } = useFetchData<TeamI>(
		ApiRequest.getUrlById("teams", dataGame?.time_visitante ?? 0),
		{},
		dataGame != undefined
	);
	const { data: dataTournament } = useFetchData<TournamentI>(
		ApiRequest.getUrlById("tournaments", dataGame?.torneio ?? 0),
		{},
		dataGame != undefined
	);

	// Get goals of team home and away
	const [goalsHome, setGoalsHome] = useState<GoalI[]>([]);
	const [goalsAway, setGoalsAway] = useState<GoalI[]>([]);
	useEffect(() => {
		if (!dataGame || !dataTeamHome || !dataTeamAway) return;
		setGoalsHome(dataGame.gols.filter((goal) => goal.time_marcou == dataTeamHome.id));
		setGoalsAway(dataGame.gols.filter((goal) => goal.time_marcou == dataTeamAway.id));
	}, [dataGame, dataTeamHome, dataTeamAway]);

	// Create game facts timeline
	const [timeline, setTimeline] = useState<{ type: Event; data: GoalI | CardI }[]>([]);
	useEffect(() => {
		if (!dataGame) return;
		setTimeline(
			[
				...dataGame.cartoes.map((card) => ({
					type: Event.Card,
					data: card,
				})),
				...dataGame.gols.map((goal) => ({
					type: Event.Goal,
					data: goal,
				})),
			].sort((a, b) => a.data.tempo.toString().localeCompare(b.data.tempo.toString()))
		);
	}, [dataGame]);

	return (
		<GameContainer>
			<div className="description-container">
				<div className="tournament-container">
					<p>{dataTournament?.nome}</p>
				</div>
				<div className="score-container">
					{dataGame && (
						<div className="teams">
							<Link className="team" to={Pages.Teams + dataTeamHome?.id.toString()}>
								<img src={dataTeamHome?.imagem} alt={dataTeamHome?.nome} />
								<p>{dataTeamHome?.abreviacao}</p>
							</Link>
							<div className="score">
								<p>{goalsHome.length}</p>
								<p className="divisor">X</p>
								<p>{goalsAway.length}</p>
							</div>
							<Link className="team" to={Pages.Teams + dataTeamAway?.id.toString()}>
								<img src={dataTeamAway?.imagem} alt={dataTeamAway?.nome} />
								<p>{dataTeamAway?.abreviacao}</p>
							</Link>
						</div>
					)}
				</div>
				<div className="data">
					<MdPlace className="icon" />
					<p>{dataGame?.estadio}</p>
				</div>
				<div className="data">
					<MdCalendarMonth className="icon" />
					<p>{formatDateToDDMMYYYY(dataGame?.data_hora_inicio ?? "")}</p>
				</div>
				<div className="data">
					<MdAccessTimeFilled className="icon" />
					<p>{formatDateToHHmm(dataGame?.data_hora_inicio ?? "")}</p>
				</div>
			</div>
			<div className="timeline-container">
				<h2>Linha do tempo</h2>
				{timeline.length > 0 && dataTeamHome && dataTeamAway ? (
					timeline.map((event, i) =>
						event.type == Event.Goal ? (
							<EventGoal
								key={`${event.data.id}-${i}`}
								event={event.data as GoalI}
								teams={[dataTeamHome, dataTeamAway]}
							/>
						) : (
							<EventCard
								key={`${event.data.id}-${i}`}
								event={event.data as CardI}
								teams={[dataTeamHome, dataTeamAway]}
							/>
						)
					)
				) : (
					<p className="empty-message">Não há registro de Gols e Cartões</p>
				)}
			</div>
		</GameContainer>
	);
}
