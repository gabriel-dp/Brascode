import { useState, useEffect } from "react";

import { useFetchData, FetchStatus } from "@/hooks/useFetchData";
import useSearchTimeout from "@/hooks/useSearchTimeout";
import { PlayerI } from "@/types/player";
import { TeamI, generateTeamText } from "@/types/team";
import { ApiRequest } from "@/utils/requests";
import DataTable from "@/components/DataTable";
import { TableEntity } from "@/components/DataTable/types";
import DropdownOptions from "@/components/DropdownOptions";
import { MenuEntity, convertToMenuEntity } from "@/components/DropdownOptions/types";
import Searchbar from "@/components/Searchbar";

import { PlayersContainer, FilterContainer, Filter } from "./styles";

export default function Players() {
	// Filters
	const [playerName, setPlayerName, playerNameTimed] = useSearchTimeout(1000);
	const [teamSelected, setTeamSelected] = useState<MenuEntity | null>(null);

	// Requests based on the filters
	const { data: dataPlayers, status: statusPlayers } = useFetchData<PlayerI[]>(
		ApiRequest.getUrlByFilters("players", { name_like: playerNameTimed }, { teamId: teamSelected?.id })
	);
	const { data: dataTeams, status: statusTeams } = useFetchData<TeamI[]>(ApiRequest.getUrlAll("teams"));

	// Menu entities
	const [teamsMenu, setTeamsMenu] = useState<MenuEntity[]>([]);
	useEffect(() => {
		if (!dataTeams) return;
		setTeamsMenu(dataTeams.map((team) => convertToMenuEntity(team, generateTeamText(team))));
	}, [dataTeams]);

	// Table header and body
	const headerPlayerTable = ["Nome", "Posição", "Time"];
	const [bodyPlayerTable, setBodyPlayerTable] = useState<TableEntity[]>([]);
	useEffect(() => {
		if (!dataPlayers || !dataTeams) return;
		setBodyPlayerTable(
			dataPlayers.map(
				(player) =>
					({
						id: player.id,
						data: [
							{ text: player.name },
							{ text: player.position },
							{ text: dataTeams.find((team) => team.id == player.teamId)?.name },
						],
					} as TableEntity)
			)
		);
	}, [dataPlayers, dataTeams]);

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
						loading={statusTeams != FetchStatus.Success}
					/>
				</Filter>
			</FilterContainer>
			<DataTable
				header={headerPlayerTable}
				body={bodyPlayerTable}
				perpage={30}
				url=""
				loading={statusPlayers != FetchStatus.Success}
			/>
		</PlayersContainer>
	);
}

