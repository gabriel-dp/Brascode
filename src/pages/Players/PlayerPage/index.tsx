import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useFetchData } from "@/hooks/useFetchData";
import { PlayerI } from "@/types/player";
import { TeamI } from "@/types/team";
import { TournamentI, generateTournamentText } from "@/types/tournament";
import { ApiRequest } from "@/utils/requests";
import { formatDateToDDMMYYYY, calculateAge } from "@/utils/dates";
import { generateFlagUrl } from "@/utils/country";
import StatisticsPanel from "@/components/StatisticsPanel";
import { Statistics } from "@/components/StatisticsPanel/types";
import DropdownOptions from "@/components/DropdownOptions";
import { MenuEntity, convertToMenuEntity } from "@/components/DropdownOptions/types";

import { BioContainer, PlayerContainer, PlayerImageContainer, DataContainer, FilterContainer } from "./styles";

function Data(props: { title: string; children: React.ReactNode }) {
	return (
		<DataContainer>
			<p className="title">{props.title}</p>
			<p className="data">{props.children}</p>
		</DataContainer>
	);
}

export default function PlayerPage() {
	// Filters
	const [selectedTournament, setSelectedTournament] = useState<MenuEntity | null>(null);

	// Get id from url
	const { id } = useParams();

	// Requests
	const { data: dataPlayer } = useFetchData<PlayerI>(ApiRequest.getUrlById("players", id ?? 0));
	const { data: dataTeam } = useFetchData<TeamI>(
		ApiRequest.getUrlById("teams", dataPlayer?.teamId ?? 0),
		{},
		dataPlayer != undefined
	);
	const { data: dataTournaments } = useFetchData<TournamentI[]>(ApiRequest.getUrlByFilters("tournaments"));

	// Menu
	const [tournaments, setTournaments] = useState<MenuEntity[]>([]);
	useEffect(() => {
		if (!dataTournaments) return;
		setTournaments(
			dataTournaments.map((tournament) => convertToMenuEntity(tournament, generateTournamentText(tournament)))
		);
	}, [dataTournaments]);

	// Reload statistics when selected tournament changes
	const [statistics, setStatistics] = useState<Statistics | null>(null);
	useEffect(() => {
		if (tournaments.length == 0) return;
		if (!selectedTournament) {
			setSelectedTournament(tournaments[0]);
			return;
		}
		setStatistics({
			goalsScored: { data: 10 },
			goalsAssisted: { data: 2 },
			cardsYellow: { data: 4 },
			cardsRed: { data: 0 },
		});
	}, [tournaments, selectedTournament]);

	return (
		<PlayerContainer>
			<div className="bio-container">
				<PlayerImageContainer>
					<img className="player" src={dataPlayer?.image} alt={dataPlayer?.name} />
				</PlayerImageContainer>
				<div className="bio-wrapper">
					{dataPlayer && (
						<BioContainer $teamColor={dataTeam?.colors?.primary}>
							<div className="main">
								<div>
									<p className="nick">{dataPlayer?.nickname}</p>
									<p className="name">{dataPlayer?.name}</p>
									<img
										className="country"
										src={generateFlagUrl(dataPlayer?.nationality)}
										alt={dataPlayer?.nationality}
									/>
								</div>
								<div>
									{dataPlayer?.teamId && (
										<div className="team">
											<p>#{dataPlayer?.jersey}</p>
											<Link to={`/times/${dataTeam?.id}`}>
												<img src={dataTeam?.image} alt={dataTeam?.id.toString()} />
											</Link>
										</div>
									)}
								</div>
							</div>
							<hr />
							<div className="data">
								<Data title="Posição">{dataPlayer.position}</Data>
								<Data title="Altura">{dataPlayer.height}cm</Data>
								<Data title="Peso">{dataPlayer.weight}kg</Data>
								<Data title="Pé">{dataPlayer.foot}</Data>
								<Data title="Data de Nascimento">
									{formatDateToDDMMYYYY(dataPlayer.birthdate)} ({calculateAge(dataPlayer.birthdate)} anos)
								</Data>
							</div>
						</BioContainer>
					)}
				</div>
			</div>
			<div className="statistics-wrapper">
				<h2>Estatísticas</h2>
				<FilterContainer>
					<DropdownOptions
						placeholder="Torneio"
						items={tournaments}
						selected={selectedTournament}
						setSelected={setSelectedTournament}
						loading={tournaments.length == 0}
						disableClear
					/>
				</FilterContainer>
				{statistics && <StatisticsPanel statistics={statistics} />}
			</div>
		</PlayerContainer>
	);
}
