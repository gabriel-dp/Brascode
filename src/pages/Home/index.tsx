import { FetchStatus, useFetchData } from "@/hooks/useFetchData";
import { ApiRequest } from "@/utils/requests";
import { TeamI } from "@/types/team";
import Quiz from "@/components/Quiz";
import Loading from "@/components/Loading";

import { HomeContainer, QuizContainer } from "./styles";

export default function Home() {
	const { data: dataTeams, status: statusTeams } = useFetchData<TeamI[]>(ApiRequest.getUrlAll("teams"));
	const { data: dataPlayers, status: statusPlayers } = useFetchData<TeamI[]>(ApiRequest.getUrlAll("players"));

	return (
		<HomeContainer>
			<QuizContainer>
				<h2>Acerte o Time</h2>
				{statusTeams != FetchStatus.Success && <Loading />}
				{dataTeams && <Quiz<TeamI> elements={dataTeams} quantity={4} />}
			</QuizContainer>
			<QuizContainer>
				<h2>Acerte o Jogador</h2>
				{statusPlayers != FetchStatus.Success && <Loading />}
				{dataPlayers && <Quiz<TeamI> elements={dataPlayers} quantity={4} />}
			</QuizContainer>
		</HomeContainer>
	);
}
