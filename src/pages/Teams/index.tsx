import { useEffect, useMemo, useState } from "react";

import useSearchTimeout from "@/hooks/useSearchTimeout";
import { generateTournamentText } from "@/types/tournaments";
import Searchbar from "@/components/Searchbar";
import { MenuEntity, convertToMenuEntity } from "@/components/DropdownOptions/types";
import DropdownOptions from "@/components/DropdownOptions";
import DataTable from "@/components/DataTable";
import { TableEntity, convertToTableRow } from "@/components/DataTable/types";

import dataTeams from "@/data/teams.json";
import dataTournaments from "@/data/tournaments.json";

import { TeamsContainer, FilterContainer, Filter } from "./styles";

export default function Teams() {
	const [teamName, setTeamName, teamNameTimed] = useSearchTimeout(1000);
	const [tournamentSelected, setTournamentSelected] = useState<MenuEntity | null>(null);

	const headerTeamTable = useMemo(
		() => ({
			name: "Nome",
		}),
		[]
	);

	const bodyTeamTable: TableEntity[] = useMemo(
		() => dataTeams.teams.map((team) => convertToTableRow(team, Object.keys(headerTeamTable))),
		[headerTeamTable]
	);

	const tournamentsMenu: MenuEntity[] = useMemo(
		() =>
			dataTournaments.tournaments.map((tournament) =>
				convertToMenuEntity(tournament, generateTournamentText(tournament))
			),
		[]
	);

	// Triggers when the filters change
	useEffect(() => {
		console.log(teamNameTimed, tournamentSelected);
	}, [teamNameTimed, tournamentSelected]);

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
						loading={false}
					/>
				</Filter>
			</FilterContainer>
			<DataTable header={Object.values(headerTeamTable)} body={bodyTeamTable} perpage={20} />
		</TeamsContainer>
	);
}

