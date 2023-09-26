import DataTable from "@/components/DataTable";
import data from "@/data/players.json";

import { PlayersContainer } from "./styles";

export default function Players() {
	const PlayerTableHeader: string[] = ["Nome", "Posição", "Time"];
	const PlayerTableBody: string[][] = data.players.map((player) => {
		return [player.name, player.position, player.team];
	});

	return (
		<PlayersContainer>
			<h1>Jogadores</h1>
			<DataTable header={PlayerTableHeader} body={PlayerTableBody} />
		</PlayersContainer>
	);
}

