import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { FetchStatus, useFetchData } from "@/hooks/useFetchData";
import { TeamI } from "@/types/team";
import { PlayerI } from "@/types/player";
import { ApiRequest } from "@/utils/requests";
import { generateFlagUrl } from "@/utils/country";
import { formatDateToDDMMYYYY, calculateAge } from "@/utils/dates";
import DataTable from "@/components/DataTable";
import { TableEntity } from "@/components/DataTable/types";

import { BioContainer, DataContainer, TeamContainer, TeamImageContainer } from "./styles";

function Data(props: { title: string; children: React.ReactNode }) {
	return (
		<DataContainer>
			<p className="title">{props.title}</p>
			<p className="data">{props.children}</p>
		</DataContainer>
	);
}

export default function TeamPage() {
	// Get id from url
	const { id } = useParams();

	// Requests
	const { data: dataTeam } = useFetchData<TeamI>(ApiRequest.getUrlById("teams", id ?? 0));
	const { data: dataRoster, status: statusRoster } = useFetchData<PlayerI[]>(
		ApiRequest.getUrlByFilters("players", { teamId: id })
	);

	// Table header and body
	const headerPlayerTable = ["Nome", "Posição"];
	const [bodyPlayerTable, setBodyPlayerTable] = useState<TableEntity[]>([]);
	useEffect(() => {
		if (!dataRoster) return;
		setBodyPlayerTable(
			dataRoster.map((player) => ({
				id: player.id,
				data: [{ text: player.name }, { text: player.position }],
			}))
		);
	}, [dataRoster]);

	return (
		<TeamContainer $teamColor={dataTeam?.colors?.primary}>
			<div className="bio-container">
				<TeamImageContainer>
					<img className="team" src={dataTeam?.image} />
				</TeamImageContainer>
				<div className="bio-wrapper">
					{dataTeam && (
						<BioContainer $teamColor={dataTeam.colors?.primary}>
							<div className="main">
								<div>
									<p className="name">{dataTeam.name}</p>
									<p className="abbreviation">{dataTeam.abbreviation}</p>
									<img className="country" src={generateFlagUrl(dataTeam.country)} />
								</div>
							</div>
							<hr />
							<div className="data">
								<Data title="Técnico">{dataTeam.coach}</Data>
								<Data title="Fundação">
									{formatDateToDDMMYYYY(dataTeam.foundation)} ({calculateAge(dataTeam.foundation)} anos)
								</Data>
							</div>
						</BioContainer>
					)}
				</div>
			</div>
			<div className="roster-container">
				<h2 className="title">Elenco Atual</h2>
				<DataTable
					header={headerPlayerTable}
					body={bodyPlayerTable}
					perpage={25}
					url="/jogadores/"
					loading={statusRoster != FetchStatus.Success}
				/>
			</div>
		</TeamContainer>
	);
}

