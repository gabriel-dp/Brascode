import Quiz from "@/components/Quiz";
import { useFetchData } from "@/hooks/useFetchData";
import { TeamI } from "@/types/team";
import { ApiRequest } from "@/utils/requests";
import { HomeContainer, QuizContainer } from "./styles";

export default function Home() {
	const { data: dataTeams } = useFetchData<TeamI[]>(ApiRequest.getUrlAll("teams"));
	const { data: dataPlayers } = useFetchData<TeamI[]>(ApiRequest.getUrlAll("players"));

	return (
		<HomeContainer>
			<QuizContainer>
				<h2>Acerte o Time</h2>
				{dataTeams && <Quiz<TeamI> elements={dataTeams} quantity={4} />}
			</QuizContainer>
			<QuizContainer>
				<h2>Acerte o Jogador</h2>
				{dataPlayers && <Quiz<TeamI> elements={dataPlayers} quantity={4} />}
			</QuizContainer>
		</HomeContainer>
	);
}
