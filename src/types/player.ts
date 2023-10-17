import { Entity, Id } from "./entity";

export interface PlayerI extends Entity {
	name: string;
	birthdate: string; // !
	nationality: string; // !
	height: number;
	weight: number;
	position: string; // !
	foot: string; // !
	teamId: Id;
	jersey: number | null;
}

export const generatePlayerText = (p: PlayerI): string => p.name;

