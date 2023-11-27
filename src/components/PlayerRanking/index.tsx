import { ApiRequest } from "@/utils/requests";
import { FetchStatus, useFetchData } from "@/hooks/useFetchData";
import { RankedPlayerI } from "@/types/player";
import { Id } from "@/types/entity";

import { RankingContainer, PlayerCardContainer } from "./styles";
import Loading from "../Loading";

function PlayerCard(props: { position: number; player: RankedPlayerI }) {
	return (
		<PlayerCardContainer>
			<div className="position">{props.position}º</div>
			<div className="player">
				<p>
					{props.player.name} ({props.player.nickname})
				</p>
			</div>
		</PlayerCardContainer>
	);
}

interface PlayerRankingI {
	title: string;
	tournamentId: Id;
	category: "goals" | "cards" | "assists";
	limit: number;
}

export default function PlayerRanking(props: PlayerRankingI) {
	const { data: dataRanking, status: statusRanking } = useFetchData<RankedPlayerI[]>(
		ApiRequest.getUrlAll(`ranking/${props.tournamentId}/${props.category}/${props.limit}`)
	);

	return (
		<RankingContainer>
			<div className="title">
				<p>{props.title}</p>
			</div>
			<div className="players">
				{statusRanking != FetchStatus.Success && <Loading />}
				{dataRanking && dataRanking.map((player, i) => <PlayerCard key={player.id} player={player} position={i + 1} />)}
			</div>
		</RankingContainer>
	);
}

