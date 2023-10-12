import { useState, useEffect } from "react";

import { Entity } from "@/utils/types";
import DataTable from "@/components/DataTable";
import Searchbar from "@/components/Searchbar";
import data from "@/data/players.json";

import { PlayersContainer, FilterContainer, Filter } from "./styles";
import DropdownOptions from "@/components/DropdownOptions";
import useSearchTimeout from "@/hooks/useSearchTimeout";

interface PlayerI {
	name: string;
	position: string;
	team: string;
}

export default function Players() {
	const [playerName, setPlayerName, playerNameTimed] = useSearchTimeout(1000);
	const [team, setTeam] = useState<Entity | null>(null);

	useEffect(() => {
		console.log(playerNameTimed, team);
	}, [playerNameTimed, team]);

	const PlayerTableHeader = {
		name: "Nome",
		position: "Posição",
		team: "Time",
	};

	const PlayerTableBody: string[][] = data.players.map((player) => {
		return Object.keys(PlayerTableHeader).map((property) => player[property as keyof PlayerI]);
	});

	const teams: Entity[] = [
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
			<DataTable header={Object.values(PlayerTableHeader)} body={PlayerTableBody} />
		</PlayersContainer>
	);
}

