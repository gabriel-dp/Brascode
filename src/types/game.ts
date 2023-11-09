import { Entity, Id } from "./entity";

export type TimeInterval = string; // minutes and seconds

export interface GoalI extends Entity {
	time: TimeInterval;
	teamIdAuthor: Id;
	teamIdSuffered: Id;
	playerIdAuthor: Id;
	playerIdAssist: Id | null;
	isOwn: boolean;
}

export enum CardColor {
	Red = "red",
	Yellow = "yellow",
}

export interface CardI extends Entity {
	time: TimeInterval;
	color: CardColor;
	teamId: Id;
	playerId: Id | null;
}

export interface GameI extends Entity {
	tournamentId: Id;
	local: string;
	start: string; // date
	teamIdHome: Id;
	teamIdAway: Id;
	goals: GoalI[];
	cards: CardI[];
}

