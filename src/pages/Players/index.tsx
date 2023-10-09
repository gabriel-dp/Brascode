import { useState, useEffect } from "react";

import DataTable from "@/components/DataTable";
import Searchbar from "@/components/Searchbar";
import data from "@/data/players.json";

import { PlayersContainer, FilterContainer, NameSearchContainer } from "./styles";

interface PlayerI {
	name: string;
	position: string;
	team: string;
}

export default function Players() {
	const [playerName, setPlayerName] = useState("");

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

	return (
		<PlayersContainer>
			<h1>Jogadores</h1>
			<FilterContainer>
				<NameSearchContainer>
					<Searchbar placeholder="Nome do jogador" value={playerName} setValue={setPlayerName} />
				</NameSearchContainer>
			</FilterContainer>
			<DataTable header={Object.values(PlayerTableHeader)} body={PlayerTableBody} />
		</PlayersContainer>
	);
}

