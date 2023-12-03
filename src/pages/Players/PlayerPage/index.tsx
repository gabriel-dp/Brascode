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
		ApiRequest.getUrlById("teams", dataPlayer?.time ?? 0),
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

	// Set default selected tournament
	useEffect(() => {
		if (tournaments.length == 0) return;
		if (!selectedTournament) {
			setSelectedTournament(tournaments[0]);
			return;
		}
	}, [tournaments, selectedTournament]);

	return (
		<PlayerContainer>
			<div className="bio-container">
				<PlayerImageContainer>
					<img className="player" src={dataPlayer?.imagem} alt={dataPlayer?.nome} />
				</PlayerImageContainer>
				<div className="bio-wrapper">
					{dataPlayer && (
						<BioContainer $teamColor={dataTeam?.cor_primaria?.toString()}>
							<div className="main">
								<div>
									<p className="nick">{dataPlayer?.apelido}</p>
									<p className="name">{dataPlayer?.nome}</p>
									<img className="country" src={generateFlagUrl(dataPlayer?.pais)} alt={dataPlayer?.pais} />
								</div>
								<div>
									{dataPlayer?.time && (
										<div className="team">
											<p>#{dataPlayer?.numero_camisa}</p>
											<Link to={`/times/${dataTeam?.id}`}>
												<img src={dataTeam?.imagem} alt={dataTeam?.id.toString()} />
											</Link>
										</div>
									)}
								</div>
							</div>
							<hr />
							<div className="data">
								<Data title="Posição">{dataPlayer.posicao}</Data>
								<Data title="Altura">{dataPlayer.altura}cm</Data>
								<Data title="Peso">{dataPlayer.peso}kg</Data>
								<Data title="Pé">{dataPlayer.preferencia_pe}</Data>
								<Data title="Data de Nascimento">
									{formatDateToDDMMYYYY(dataPlayer.dt_nascimento)} ({calculateAge(dataPlayer.dt_nascimento)} anos)
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
				{selectedTournament && dataPlayer && (
					<StatisticsPanel playerId={dataPlayer.id} tournamentId={selectedTournament.id} />
				)}
			</div>
		</PlayerContainer>
	);
}
