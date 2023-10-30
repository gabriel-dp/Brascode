import { useEffect, useState } from "react";

import { Pages } from "@/routes";
import DataTable from "@/components/DataTable";
import { MenuEntity, convertToMenuEntity } from "@/components/DropdownOptions/types";
import DropdownOptions from "@/components/DropdownOptions";
import { FetchStatus, useFetchData } from "@/hooks/useFetchData";
import { TournamentI, generateTournamentText } from "@/types/tournament";
import { ApiRequest } from "@/utils/requests";
import { TableRow, TableColumn } from "@/components/DataTable/types";
import { TeamI } from "@/types/team";

import { Filter, FilterContainer, TournamentsContainer } from "./styles";

export default function Tournaments() {
	// Filters
	const [selectedTournament, setSelectedTournament] = useState<MenuEntity | null>(null);

	// Requests
	const { data: dataTournaments, status: statusTournaments } = useFetchData<TournamentI[]>(
		ApiRequest.getUrlAll("tournaments")
	);
	const { data: dataTeams, status: statusTeams } = useFetchData<TeamI[]>(
		ApiRequest.getUrlByFilters("teams", { tournamentId: selectedTournament?.id }),
		{},
		selectedTournament != null
	);

	// Menu
	const [tournamentsMenu, setTournamentsMenu] = useState<MenuEntity[]>([]);
	useEffect(() => {
		if (!dataTournaments) return;
		setTournamentsMenu(
			dataTournaments.map((tournament) => convertToMenuEntity(tournament, generateTournamentText(tournament)))
		);
	}, [dataTournaments]);

	// Set initial menu selection
	useEffect(() => {
		if (tournamentsMenu.length == 0) return;
		setSelectedTournament(tournamentsMenu[0]);
	}, [tournamentsMenu]);

	// Table header and body
	const headerStandingsTable: TableColumn[] = [
		{ text: "#", tooltip: "Classificação" },
		{ text: "" },
		{ text: "Time" },
		{ text: "PTS", tooltip: "Pontos" },
		{ text: "JG", tooltip: "Jogos" },
		{ text: "VIT", tooltip: "Vitórias" },
		{ text: "EMP", tooltip: "Empates" },
		{ text: "DER", tooltip: "Derrotas" },
		{ text: "GP", tooltip: "Gols Pró" },
		{ text: "GC", tooltip: "Gols Contra" },
		{ text: "SG", tooltip: "Saldo de Gols" },
		{ text: "CA", tooltip: "Cartões Amarelos" },
		{ text: "CV", tooltip: "Cartões Vermelhos" },
	];
	const [bodyStandingsTable, setBodyStandingsTable] = useState<TableRow[]>([]);
	useEffect(() => {
		if (!dataTournaments || !selectedTournament || !dataTeams) return;
		const standings = dataTournaments.find((tournament) => tournament.id == selectedTournament.id)?.standings;
		if (!standings) return;

		setBodyStandingsTable(
			standings.map((s) => {
				const team = dataTeams.find((team) => team.id == s.teamId);
				return {
					id: s.teamId,
					data: [
						{ text: s.position },
						{ text: team?.abbreviation ?? "", image: team?.image },
						{ text: team?.name ?? "" },
						{ text: s.points },
						{ text: s.games },
						{ text: s.wins },
						{ text: s.draws },
						{ text: s.losses },
						{ text: s.goalsScored },
						{ text: s.goalsSuffered },
						{ text: s.goalsScored - s.goalsSuffered },
						{ text: s.yellowCards },
						{ text: s.redCards },
					],
				};
			})
		);
	}, [dataTournaments, selectedTournament, dataTeams]);

	return (
		<TournamentsContainer>
			<h1>Torneios</h1>
			<FilterContainer>
				<Filter className="tournament">
					<DropdownOptions
						placeholder="Torneio"
						items={tournamentsMenu}
						selected={selectedTournament}
						setSelected={setSelectedTournament}
						disableClear
						loading={statusTournaments != FetchStatus.Success}
					/>
				</Filter>
			</FilterContainer>
			<DataTable
				header={headerStandingsTable}
				body={bodyStandingsTable}
				perpage={10}
				loading={statusTournaments != FetchStatus.Success || statusTeams != FetchStatus.Success}
				url={Pages.Teams}
			/>
		</TournamentsContainer>
	);
}

