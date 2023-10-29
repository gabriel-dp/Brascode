import { useEffect, useState } from "react";

import useSearchTimeout from "@/hooks/useSearchTimeout";
import { TournamentsI, generateTournamentText } from "@/types/tournaments";
import Searchbar from "@/components/Searchbar";
import { MenuEntity, convertToMenuEntity } from "@/components/DropdownOptions/types";
import DropdownOptions from "@/components/DropdownOptions";
import DataTable from "@/components/DataTable";
import { TableEntity } from "@/components/DataTable/types";

import { TeamsContainer, FilterContainer, Filter } from "./styles";
import { FetchStatus, useFetchData } from "@/hooks/useFetchData";
import { TeamI } from "@/types/team";
import { ApiRequest } from "@/utils/requests";

export default function Teams() {
	// Filters
	const [teamName, setTeamName, teamNameTimed] = useSearchTimeout(1000);
	const [tournamentSelected, setTournamentSelected] = useState<MenuEntity | null>(null);

	// Requests
	const { data: dataTeams, status: statusTeams } = useFetchData<TeamI[]>(
		ApiRequest.getUrlByFilters("teams", { name_like: teamNameTimed }, { tournamentId: tournamentSelected?.id })
	);
	const { data: dataTournaments, status: statusTournaments } = useFetchData<TournamentsI[]>(
		ApiRequest.getUrlAll("tournaments")
	);

	// Menu entities
	const [tournamentsMenu, setTournamentsMenu] = useState<MenuEntity[]>([]);
	useEffect(() => {
		if (!dataTournaments) return;
		setTournamentsMenu(
			dataTournaments.map((tournament) => convertToMenuEntity(tournament, generateTournamentText(tournament)))
		);
	}, [dataTournaments]);

	// Table header and body
	const headerTeamTable: string[] = ["", "Nome"];
	const [bodyTeamTable, setBodyTeamTable] = useState<TableEntity[]>([]);
	useEffect(() => {
		if (!dataTeams) return;
		setBodyTeamTable(
			dataTeams.map((team) => ({
				id: team.id,
				data: [{ text: team.name, image: team.image }, { text: team.name }],
			}))
		);
	}, [dataTeams]);

	return (
		<TeamsContainer>
			<h1>Times</h1>
			<FilterContainer>
				<Filter className="team">
					<Searchbar placeholder="Nome do time" value={teamName} setValue={setTeamName} />
				</Filter>
				<Filter className="tournament">
					<DropdownOptions
						placeholder="Torneio"
						selected={tournamentSelected}
						setSelected={setTournamentSelected}
						items={tournamentsMenu}
						loading={statusTournaments != FetchStatus.Success}
					/>
				</Filter>
			</FilterContainer>
			<DataTable
				header={Object.values(headerTeamTable)}
				body={bodyTeamTable}
				perpage={20}
				url=""
				loading={statusTeams != FetchStatus.Success}
			/>
		</TeamsContainer>
	);
}

