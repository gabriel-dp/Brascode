import { useEffect, useState } from "react";

import { Pages } from "@/routes";
import { ApiRequest } from "@/utils/requests";
import { FetchStatus, useFetchData } from "@/hooks/useFetchData";
import { TournamentI, generateTournamentText } from "@/types/tournament";
import { TeamI } from "@/types/team";
import DataTable from "@/components/DataTable";
import { TableRow, TableColumn } from "@/components/DataTable/types";
import { MenuEntity, convertToMenuEntity } from "@/components/DropdownOptions/types";
import DropdownOptions from "@/components/DropdownOptions";
import PlayerRanking from "@/components/PlayerRanking";

import { Filter, FilterContainer, RankingsContainer, TournamentsContainer } from "./styles";

export default function Tournaments() {
	// Filters
	const [selectedTournament, setSelectedTournament] = useState<MenuEntity | null>(null);

	// Requests
	const { data: dataTournaments, status: statusTournaments } = useFetchData<TournamentI[]>(
		ApiRequest.getUrlAll("tournaments")
	);
	const { data: dataTeams, status: statusTeams } = useFetchData<TeamI[]>(
		ApiRequest.getUrlAll("teams"),
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
		const standings = dataTournaments.find((tournament) => tournament.id == selectedTournament.id)?.estatistica;
		if (!standings) return;

		setBodyStandingsTable(
			standings
				.sort((a, b) => {
					if (a.pontuacao != b.pontuacao) return b.pontuacao - a.pontuacao;
					if (a.vitorias != b.vitorias) return b.vitorias - a.vitorias;

					const aDiff = a.gols_marcados - a.gols_sofridos;
					const bDiff = b.gols_marcados - b.gols_sofridos;
					if (aDiff != bDiff) return bDiff - aDiff;

					if (a.gols_marcados != b.gols_marcados) return b.gols_marcados - a.gols_marcados;
					if (a.cartao_vermelho != b.cartao_vermelho) return a.cartao_vermelho - b.cartao_vermelho;
					if (a.cartao_amarelo != b.cartao_amarelo) return a.cartao_amarelo - b.cartao_amarelo;

					return Math.random() - 0.5;
				})
				.map((s, index) => {
					const team = dataTeams.find((team) => team.id == s.time);
					return {
						id: s.time,
						data: [
							{ text: index + 1 },
							{ text: team?.abreviacao ?? "", imagem: team?.imagem },
							{ text: team?.nome ?? "" },
							{ text: s.pontuacao },
							{ text: s.vitorias + s.empates + s.derrotas },
							{ text: s.vitorias },
							{ text: s.empates },
							{ text: s.derrotas },
							{ text: s.gols_marcados },
							{ text: s.gols_sofridos },
							{ text: s.gols_marcados - s.gols_sofridos },
							{ text: s.cartao_amarelo },
							{ text: s.cartao_vermelho },
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
			<hr />
			{selectedTournament && (
				<RankingsContainer>
					<h1>Rankings</h1>
					<PlayerRanking
						title="Mais Gols no Torneio"
						tournamentId={selectedTournament?.id}
						category="goals"
						limit={5}
					/>
					<PlayerRanking
						title="Mais Assistências no Torneio"
						tournamentId={selectedTournament?.id}
						category="assists"
						limit={5}
					/>
					<PlayerRanking
						title="Mais Cartões no Torneio"
						tournamentId={selectedTournament?.id}
						category="cards"
						limit={5}
					/>
				</RankingsContainer>
			)}
		</TournamentsContainer>
	);
}
