import { FetchStatus, useFetchData } from "@/hooks/useFetchData";
import { GameI } from "@/types/game";
import { ApiRequest } from "@/utils/requests";
import { MenuEntity, convertToMenuEntity } from "@/components/DropdownOptions/types";
import { useEffect, useState } from "react";
import { TournamentsI, generateTournamentText } from "@/types/tournaments";
import DropdownOptions from "@/components/DropdownOptions";

import { CardsContainer, Filter, FilterContainer, GamesContainer } from "./styles";
import GameCard from "@/components/GameCard";
import Loading from "@/components/Loading";

export default function Games() {
	// Filters
	const [selectedTournament, setSelectedTournament] = useState<MenuEntity | null>(null);

	// Requests
	const { data: dataGames, status: statusGames } = useFetchData<GameI[]>(
		ApiRequest.getUrlByFilters("games", { tournamentId: selectedTournament?.id }),
		{},
		selectedTournament != null
	);
	const { data: dataTournaments, status: statusTournaments } = useFetchData<TournamentsI[]>(
		ApiRequest.getUrlAll("tournaments")
	);

	// Menu
	const [tournaments, setTournaments] = useState<MenuEntity[]>([]);
	useEffect(() => {
		if (!dataTournaments) return;
		setTournaments(
			dataTournaments.map((tournament) => convertToMenuEntity(tournament, generateTournamentText(tournament)))
		);
	}, [dataTournaments]);

	// Set inital menu selection
	useEffect(() => {
		if (tournaments.length == 0) return;
		setSelectedTournament(tournaments[0]);
	}, [tournaments]);

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
			</FilterContainer>
			<CardsContainer>
				{statusGames == FetchStatus.Loading && <Loading />}
				<div className="cards">
					{dataGames?.map((game) => (
						<GameCard key={game.id} game={game} />
					))}
				</div>
			</CardsContainer>
		</GamesContainer>
	);
}

