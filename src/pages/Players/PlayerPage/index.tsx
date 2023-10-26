import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { PlayerI } from "@/types/player";
import { TeamI } from "@/types/team";
import { formatDateToDDMMYYYY, calculateAge } from "@/utils/dates";
import { generateFlagUrl } from "@/utils/country";
import StatisticsPanel from "@/components/StatisticsPanel";

import dataPlayers from "@/data/players.json";
import dataTeams from "@/data/teams.json";

import { BioContainer, PlayerContainer, PlayerImageContainer, DataContainer } from "./styles";

export default function PlayerPage() {
	const { id } = useParams();
	const [playerData, setPlayerData] = useState<PlayerI | undefined>(undefined);
	const [teamData, setTeamData] = useState<TeamI | undefined>(undefined);

	// Get player data based on params
	useEffect(() => {
		setPlayerData(dataPlayers.players.find((player) => player.id.toString() == id));
	}, [id]);

	useEffect(() => {
		if (playerData) setTeamData(dataTeams.teams.find((team) => team.id.toString() == playerData.teamId));
	}, [playerData]);

	function Data(props: { title: string; children: React.ReactNode }) {
		return (
			<DataContainer>
				<p className="title">{props.title}</p>
				<p className="data">{props.children}</p>
			</DataContainer>
		);
	}

	const STATISTICS = useMemo(
		() => ({
			goalsScored: { data: 10 },
			goalsAssisted: { data: 2 },
			cardsYellow: { data: 4 },
			cardsRed: { data: 0 },
		}),
		[]
	);

	return (
		<PlayerContainer>
			<div className="bio-container">
				<PlayerImageContainer>
					<img className="player" src={playerData?.image} />
				</PlayerImageContainer>
				<div className="bio-wrapper">
					{playerData && (
						<BioContainer $teamColor={teamData?.colors?.primary}>
							<div className="main">
								<div>
									<p className="nick">{playerData?.nickname}</p>
									<p className="name">{playerData?.name}</p>
									<img className="country" src={generateFlagUrl(playerData?.nationality)} />
								</div>
								<div>
									{playerData?.teamId && (
										<div className="team">
											<p>#{playerData?.jersey}</p>
											<Link to={`/times/${teamData?.id}`}>
												<img src={teamData?.image} />
											</Link>
										</div>
									)}
								</div>
							</div>
							<hr />
							<div className="data">
								<Data title="Posição">{playerData.position}</Data>
								<Data title="Altura">{playerData.height}cm</Data>
								<Data title="Peso">{playerData.weight}kg</Data>
								<Data title="Pé">{playerData.foot}</Data>
								<Data title="Data de Nascimento">
									{formatDateToDDMMYYYY(playerData.birthdate)} ({calculateAge(playerData.birthdate)} anos)
								</Data>
							</div>
						</BioContainer>
					)}
				</div>
			</div>
			<div className="statistics-wrapper">
				<h2>Estatísticas</h2>
				<StatisticsPanel statistics={STATISTICS} />
			</div>
		</PlayerContainer>
	);
}

