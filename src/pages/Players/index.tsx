import { useState, useEffect } from "react";

import { Entity } from "@/utils/types";
import DataTable from "@/components/DataTable";
import Searchbar from "@/components/Searchbar";
import data from "@/data/players.json";

import { PlayersContainer, FilterContainer, NameSearchContainer, TeamSearchContainer } from "./styles";
import DropdownOptions from "@/components/DropdownOptions";

interface PlayerI {
	name: string;
	position: string;
	team: string;
}

export default function Players() {
	const [playerName, setPlayerName] = useState("");
	const [team, setTeam] = useState<Entity | null>(null);

	useEffect(() => {
		console.log(playerName);
	}, [playerName]);

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
				<NameSearchContainer>
					<Searchbar placeholder="Nome do jogador" value={playerName} setValue={setPlayerName} />
				</NameSearchContainer>
				<TeamSearchContainer>
					<DropdownOptions title="Selecione o Time" selected={team} setSelected={setTeam} items={teams} />
				</TeamSearchContainer>
			</FilterContainer>
			<DataTable header={Object.values(PlayerTableHeader)} body={PlayerTableBody} />
		</PlayersContainer>
	);
}

