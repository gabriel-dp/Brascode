import { Link } from "react-router-dom";

import { Pages } from "@/routes";
import { ApiRequest } from "@/utils/requests";
import { FetchStatus, useFetchData } from "@/hooks/useFetchData";
import { RankedPlayerI } from "@/types/player";
import { Id } from "@/types/entity";
import Loading from "@/components/Loading";

import { RankingContainer, PlayerCardContainer } from "./styles";

function PlayerCard(props: { position: number; player: RankedPlayerI }) {
	return (
		<PlayerCardContainer>
			<div className="position">
				<p>{props.position}º</p>
			</div>
			<Link to={Pages.Players + props.player.id.toString()}>
				<div className="player">
					<div className="image">
						<img src={props.player.image} alt={props.player.id.toString()} />
					</div>
					<p>{props.player.nickname}</p>
					<div className="quantity">
						<p>({props.player.quantity})</p>
					</div>
				</div>
			</Link>
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
