import { Entity, Id } from "@/types/entity";

export enum Position {}

export interface PlayerI extends Entity {
	nome: string;
	apelido: string;
	dt_nascimento: string; // date
	pais: string;
	altura: number;
	peso: number;
	posicao: Position;
	preferencia_pe: string;
	time: Id | null;
	numero_camisa: number | null;
}

export const generatePlayerText = (p: PlayerI): string => p.nome;

export interface RankedPlayerI {
	quantidade: number;
	jogador: PlayerI;
}

export interface Statistics {
	gols: number;
	assistencia: number;
	cartao_amarelo: number;
	cartao_vermelho: number;
}

export interface StatisticsPlayerI extends Statistics {
	jogador: PlayerI;
}
