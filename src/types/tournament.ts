import { Entity, Id } from "@/types/entity";

export interface StandingsI {
	time: Id;
	pontuacao: number;
	games: number;
	vitorias: number;
	empates: number;
	derrotas: number;
	gols_marcados: number;
	gols_sofridos: number;
	cartao_amarelo: number;
	cartao_vermelho: number;
}

export interface TournamentI extends Entity {
	nome: string;
	data: string;
	estatistica: StandingsI[];
}

export const generateTournamentText = (t: TournamentI) => `${t.nome} (${t.data})`;
