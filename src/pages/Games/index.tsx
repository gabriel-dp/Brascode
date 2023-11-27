import { useEffect, useRef, useState } from "react";

import { FetchStatus, useFetchData } from "@/hooks/useFetchData";
import { GameI } from "@/types/game";
import { TournamentI, generateTournamentText } from "@/types/tournament";
import { ApiRequest } from "@/utils/requests";
import DropdownOptions from "@/components/DropdownOptions";
import { MenuEntity, convertToMenuEntity } from "@/components/DropdownOptions/types";
import GameCard from "@/components/GameCard";
import Loading from "@/components/Loading";

import { CardsContainer, Filter, FilterButton, FilterContainer, GamesContainer } from "./styles";
import { TeamI, generateTeamText } from "@/types/team";

export default function Games() {
	// Filters
	const [selectedTournament, setSelectedTournament] = useState<MenuEntity | null>(null);
	const [selectedTeam, setSelectedTeam] = useState<MenuEntity | null>(null);

	// Requests
	const { data: dataGames, status: statusGames } = useFetchData<GameI[]>(
		ApiRequest.getUrlByFilters("games", { tournamentId: selectedTournament?.id }, { teamId: selectedTeam?.id }),
		{},
		selectedTournament != null
	);
	const { data: dataTournaments, status: statusTournaments } = useFetchData<TournamentI[]>(
		ApiRequest.getUrlAll("tournaments")
	);
	const { data: dataTeams, status: statusTeams } = useFetchData<TeamI[]>(ApiRequest.getUrlAll("teams"));

	// Tournaments Menu
	const [tournaments, setTournaments] = useState<MenuEntity[]>([]);
	useEffect(() => {
		if (!dataTournaments) return;
		setTournaments(
			dataTournaments.map((tournament) => convertToMenuEntity(tournament, generateTournamentText(tournament)))
		);
	}, [dataTournaments]);

	// Teams menu
	const [teams, setTeams] = useState<MenuEntity[]>([]);
	useEffect(() => {
		if (!dataTeams) return;
		setTeams(dataTeams.map((team) => convertToMenuEntity(team, generateTeamText(team))));
	}, [dataTeams]);

	// Set inital menu selection
	useEffect(() => {
		if (tournaments.length == 0) return;
		setSelectedTournament(tournaments[0]);
	}, [tournaments]);

	// Set next game button ref
	const ref = useRef<HTMLDivElement | null>(null);
	const [nextGame, setNextGame] = useState<GameI | null>(null);
	useEffect(() => {
		if (!dataGames) return;
		const now = new Date();
		setNextGame(
			dataGames.find((game) => now.getTime() < new Date(game.start).getTime()) ?? dataGames[dataGames.length - 1]
		);
	}, [dataGames]);

	function scrollToRef() {
		if (ref.current) {
			ref.current.scrollIntoView({
				behavior: "smooth",
				block: "center",
			});
		}
	}

	return (
		<GamesContainer>
			<h1>Jogos</h1>
			<FilterContainer>
				<Filter className="tournament">
					<DropdownOptions
						placeholder="Torneio"
						items={tournaments}
						selected={selectedTournament}
						setSelected={setSelectedTournament}
						loading={statusTournaments != FetchStatus.Success}
						disableClear
					/>
				</Filter>
				<Filter className="team">
					<DropdownOptions
						placeholder="Time"
						items={teams}
						selected={selectedTeam}
						setSelected={setSelectedTeam}
						loading={statusTeams != FetchStatus.Success}
						sort
					/>
				</Filter>
				<Filter className="nextgame">
					<FilterButton onClick={scrollToRef}>Ir para o próximo jogo</FilterButton>
				</Filter>
			</FilterContainer>
			<CardsContainer>
				{statusGames != FetchStatus.Success && <Loading />}
				{dataGames && (
					<div className="cards">
						{dataGames.map((game) => (
							<GameCard key={game.id} game={game} refScroll={game == nextGame ? ref : null} />
						))}
					</div>
				)}
			</CardsContainer>
		</GamesContainer>
	);
}

