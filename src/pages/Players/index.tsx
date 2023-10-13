import { useState, useEffect } from "react";

import { MenuEntity } from "@/utils/types";
import useSearchTimeout from "@/hooks/useSearchTimeout";
import DataTable from "@/components/DataTable";
import DropdownOptions from "@/components/DropdownOptions";
import Searchbar from "@/components/Searchbar";

import dataPlayers from "@/data/players.json";
import dataTeams from "@/data/teams.json";

import { PlayersContainer, FilterContainer, Filter } from "./styles";

export default function Players() {
	const [playerName, setPlayerName, playerNameTimed] = useSearchTimeout(1000);
	const [team, setTeam] = useState<MenuEntity | null>(null);

	// Triggers when the filters change
	useEffect(() => {
		console.log(playerNameTimed, team);
	}, [playerNameTimed, team]);

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
						selected={team}
						setSelected={setTeam}
						items={dataTeams.teams}
						loading={false}
					/>
				</Filter>
			</FilterContainer>
			<DataTable header={dataPlayers.header} body={dataPlayers.players} />
		</PlayersContainer>
	);
}

