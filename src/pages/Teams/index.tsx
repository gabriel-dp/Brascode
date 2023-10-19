import { useEffect, useState } from "react";

import useSearchTimeout from "@/hooks/useSearchTimeout";
import { generateTournamentText } from "@/types/tournaments";
import Searchbar from "@/components/Searchbar";
import { MenuEntity, convertToMenuEntity } from "@/components/DropdownOptions/types";
import DropdownOptions from "@/components/DropdownOptions";
import DataTable from "@/components/DataTable";
import { TableEntity } from "@/components/DataTable/types";

import dataTeams from "@/data/teams.json";
import dataTournaments from "@/data/tournaments.json";

import { TeamsContainer, FilterContainer, Filter } from "./styles";

export default function Teams() {
	const [teamName, setTeamName, teamNameTimed] = useSearchTimeout(1000);
	const [tournamentSelected, setTournamentSelected] = useState<MenuEntity | null>(null);

	// Table header and body
	const headerTeamTable: string[] = ["", "Nome"];
	const bodyTeamTable: TableEntity[] = dataTeams.teams.map((team) => ({
		id: team.id,
		data: [{ text: team.name, image: team.image }, { text: team.name }],
	}));

	// Menu entities
	const tournamentsMenu: MenuEntity[] = dataTournaments.tournaments.map((tournament) =>
		convertToMenuEntity(tournament, generateTournamentText(tournament))
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

