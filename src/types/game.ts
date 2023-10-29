import { Entity, Id } from "./entity";

export type TimeInterval = string; // minutes and seconds

export interface GoalI {
	time: TimeInterval;
	teamIdAuthor: Id;
	teamIdSuffered: Id;
	playerIdAuthor: Id;
	playerIdAssit: Id | null;
	isOwn: boolean;
}

export enum CardColor {
	Red = "red",
	Yellow = "yellow",
}

export interface CardI {
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

