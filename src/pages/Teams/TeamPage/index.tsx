import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { TeamI } from "@/types/team";
import { PlayerI } from "@/types/player";
import { generateFlagUrl } from "@/utils/country";
import { formatDateToDDMMYYYY, calculateAge } from "@/utils/dates";

import dataTeams from "@/data/teams.json";
import dataPlayers from "@/data/players.json";

import { BioContainer, DataContainer, TeamContainer, TeamImageContainer } from "./styles";
import DataTable from "@/components/DataTable";
import { TableEntity } from "@/components/DataTable/types";

export default function TeamPage() {
	const [teamData, setTeamData] = useState<TeamI | undefined>(undefined);
	const [roster, setRoster] = useState<PlayerI[]>([]);
	const [bodyPlayerTable, setBodyPlayerTable] = useState<TableEntity[]>([]);

	// Get team data based on params
	const { id } = useParams();
	useEffect(() => {
		setTeamData(dataTeams.teams.find((team) => team.id.toString() == id));
	}, [id]);

	// Get team roster after get team data
	useEffect(() => {
		if (teamData) {
			setRoster(dataPlayers.players.filter((player) => player.teamId.toString() == teamData.id));
		}
	}, [teamData]);

	// Table header and body
	const headerPlayerTable = ["Nome", "Posição"];
	useEffect(() => {
		setBodyPlayerTable(
			roster.map((player) => ({
				id: player.id,
				data: [{ text: player.name }, { text: player.position }],
			}))
		);
	}, [roster]);

	function Data(props: { title: string; children: React.ReactNode }) {
		return (
			<DataContainer>
				<p className="title">{props.title}</p>
				<p className="data">{props.children}</p>
			</DataContainer>
		);
	}

	return (
		<TeamContainer $teamColor={teamData?.colors?.primary}>
			<div className="bio-container">
				<TeamImageContainer>
					<img className="team" src={teamData?.image} />
				</TeamImageContainer>
				<div className="bio-wrapper">
					{teamData && (
						<BioContainer $teamColor={teamData.colors?.primary}>
							<div className="main">
								<div>
									<p className="name">{teamData.name}</p>
									<p className="abbreviation">{teamData.abbreviation}</p>
									<img className="country" src={generateFlagUrl(teamData.country)} />
								</div>
							</div>
							<hr />
							<div className="data">
								<Data title="Técnico">{teamData.coach}</Data>
								<Data title="Fundação">
									{formatDateToDDMMYYYY(teamData.foundation)} ({calculateAge(teamData.foundation)} anos)
								</Data>
							</div>
						</BioContainer>
					)}
				</div>
			</div>

			<div className="roster-container">
				<h2 className="title">Elenco Atual</h2>
				<DataTable header={headerPlayerTable} body={bodyPlayerTable} perpage={25} url="/jogadores/" />
			</div>
		</TeamContainer>
	);
}

