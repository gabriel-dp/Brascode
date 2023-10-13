import { useState, useEffect } from "react";

import { MenuEntity } from "@/utils/types";
import useSearchTimeout from "@/hooks/useSearchTimeout";
import DataTable from "@/components/DataTable";
import DropdownOptions from "@/components/DropdownOptions";
import Searchbar from "@/components/Searchbar";
import data from "@/data/players.json";

import { PlayersContainer, FilterContainer, Filter } from "./styles";

export default function Players() {
	const [playerName, setPlayerName, playerNameTimed] = useSearchTimeout(1000);
	const [team, setTeam] = useState<MenuEntity | null>(null);

	useEffect(() => {
		console.log(playerNameTimed, team);
	}, [playerNameTimed, team]);

	const PlayerTableHeader = {
		name: "Nome",
		position: "Posição",
		team: "Time",
	};

	const teams: MenuEntity[] = [
		{ id: "Vasco da Gama", text: "Vasco da Gama" },
		{ id: "Botafogo", text: "Botafogo" },
		{ id: "Flamengo", text: "Flamengo" },
		{ id: "Atlético Mineiro", text: "Atlético Mineiro" },
		{ id: "Cruzeiro", text: "Cruzeiro" },
		{ id: "Palmeiras", text: "Palmeiras" },
	];

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
						title="Selecione o Time"
						selected={team}
						setSelected={setTeam}
						items={teams}
						loading={false}
					/>
				</Filter>
			</FilterContainer>
			<DataTable header={Object.values(PlayerTableHeader)} body={data.players} />
		</PlayersContainer>
	);
}

