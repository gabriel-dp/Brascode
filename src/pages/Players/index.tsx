import { useState, useEffect, useMemo } from "react";

import { TableEntity, convertToTableRow } from "@/components/DataTable/types";
import { MenuEntity, convertToMenuEntity } from "@/components/DropdownOptions/types";
import { generateTeamText } from "@/types/team";
import useSearchTimeout from "@/hooks/useSearchTimeout";
import DataTable from "@/components/DataTable";
import DropdownOptions from "@/components/DropdownOptions";
import Searchbar from "@/components/Searchbar";

import dataPlayers from "@/data/players.json";
import dataTeams from "@/data/teams.json";

import { PlayersContainer, FilterContainer, Filter } from "./styles";

export default function Players() {
	const [playerName, setPlayerName, playerNameTimed] = useSearchTimeout(1000);
	const [teamSelected, setTeamSelected] = useState<MenuEntity | null>(null);

	const headerPlayerTable = useMemo(
		() => ({
			name: "Nome",
			position: "Posição",
			teamId: "Time",
		}),
		[]
	);

	const bodyPlayerTable: TableEntity[] = useMemo(
		() => dataPlayers.players.map((player) => convertToTableRow(player, Object.keys(headerPlayerTable))),
		[headerPlayerTable]
	);

	const teamsMenu: MenuEntity[] = useMemo(
		() => dataTeams.teams.map((teamq) => convertToMenuEntity(teamq, generateTeamText(teamq))),
		[]
	);

	// Triggers when the filters change
	useEffect(() => {
		console.log(playerNameTimed, teamSelected);
	}, [playerNameTimed, teamSelected]);

	return (
		<PlayersContainer>
			<h1>Jogadores</h1>
			<FilterContainer>
				<Filter className="player">
					<Searchbar placeholder="Nome do jogador" value={playerName} setValue={setPlayerName} />
				</Filter>
				<Filter className="team">
					<DropdownOptions
						textInput
						placeholder="Nome do Time"
						selected={teamSelected}
						setSelected={setTeamSelected}
						items={teamsMenu}
						loading={false}
					/>
				</Filter>
			</FilterContainer>
			<DataTable header={Object.values(headerPlayerTable)} body={bodyPlayerTable} perpage={30} />
		</PlayersContainer>
	);
}

