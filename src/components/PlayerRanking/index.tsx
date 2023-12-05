import { Link } from "react-router-dom";

import { Pages } from "@/routes";
import { ApiRequest } from "@/utils/requests";
import { FetchStatus, useFetchData } from "@/hooks/useFetchData";
import { RankedPlayerI } from "@/types/player";
import { Id } from "@/types/entity";
import Loading from "@/components/Loading";
import playerDefault from "@/assets/player-default.svg";

import { RankingContainer, PlayerCardContainer } from "./styles";

function PlayerCard(props: { position: number; player: RankedPlayerI }) {
	const playerImage =
		props.player.jogador.imagem == undefined || props.player.jogador.imagem == ""
			? playerDefault
			: props.player.jogador.imagem;

	return (
		<PlayerCardContainer>
			<div className="quantity">
				<p>{props.player.quantidade}</p>
			</div>
			<Link to={Pages.Players + props.player.jogador.id.toString()}>
				<div className="player">
					<div className="image">
						<img src={playerImage} alt={props.player.jogador.id.toString()} />
					</div>
					<p>{props.player.jogador.apelido}</p>
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
		ApiRequest.getUrlAll(`rankings/${props.tournamentId}/${props.category}/${props.limit}`)
	);

	return (
		<RankingContainer>
			<div className="title">
				<p>{props.title}</p>
			</div>
			<div className="players">
				{statusRanking != FetchStatus.Success && <Loading />}
				{dataRanking &&
					dataRanking.map((player, i) => <PlayerCard key={player.jogador.id} player={player} position={i + 1} />)}
			</div>
		</RankingContainer>
	);
}
