import { useState, useEffect } from "react";

import { TableEntity } from "@/components/DataTable/types";
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
	// Triggers when the filters change
	const [playerName, setPlayerName, playerNameTimed] = useSearchTimeout(1000);
	const [teamSelected, setTeamSelected] = useState<MenuEntity | null>(null);
	useEffect(() => {
		console.log(playerNameTimed, teamSelected);
	}, [playerNameTimed, teamSelected]);

	// Creates table header and body
	const headerPlayerTable = ["Nome", "Posição", "Time"];
	const [bodyPlayerTable, setBodyPlayerTable] = useState<TableEntity[]>([]);
	useEffect(() => {
		setBodyPlayerTable(
			dataPlayers.players.map((player) => ({
				id: player.id,
				data: [{ text: player.name }, { text: player.position }, { text: player.teamName }],
			}))
		);
	}, []);

	// Creates menu enitites
	const [teamsMenu, setTeamsMenu] = useState<MenuEntity[]>([]);
	useEffect(() => {
		setTeamsMenu(dataTeams.teams.map((team) => convertToMenuEntity(team, generateTeamText(team))));
	}, []);

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
						placeholder="Time"
						selected={teamSelected}
						setSelected={setTeamSelected}
						items={teamsMenu}
						loading={false}
					/>
				</Filter>
			</FilterContainer>
			<DataTable header={headerPlayerTable} body={bodyPlayerTable} perpage={30} url="" />
		</PlayersContainer>
	);
}

