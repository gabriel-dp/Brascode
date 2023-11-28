import { Entity, Id } from "@/types/entity";

export interface PlayerI extends Entity {
	name: string;
	nickname: string;
	birthdate: string; // date
	nationality: string;
	height: number;
	weight: number;
	position: string;
	foot: string;
	teamId: Id | null;
	jersey: number | null;
}

export const generatePlayerText = (p: PlayerI): string => p.name;

export interface RankedPlayerI extends PlayerI {
	quantity: number;
}

export interface StatisticsPlayerI extends PlayerI {
	goals: number;
	assists: number;
	cardsYellow: number;
	cardsRed: number;
}
