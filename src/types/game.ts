import { Entity, Id } from "./entity";

export interface EntityGame extends Entity {
	tempo: string;
	tempo_acrescimo: string;
}

export interface GoalI extends EntityGame {
	foi_contra: boolean;
	time_marcou: Id;
	time_sofreu: Id;
	jogador: Id;
	assistido: Id | null;
}

export enum CardColor {
	Yellow = 0,
	Red = 1,
}

export interface CardI extends EntityGame {
	tipo: CardColor;
	time: Id;
	jogador: Id | null;
}

export interface GameI extends Entity {
	torneio: Id;
	estadio: string;
	data_hora_inicio: string; // date
	time_casa: Id;
	time_visitante: Id;
	gols: GoalI[];
	cartoes: CardI[];
}
