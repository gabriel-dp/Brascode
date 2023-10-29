import { Entity, Id } from "@/types/entity";

export interface PlayerI extends Entity {
	name: string;
	nickname: string;
	birthdate: string; // !
	nationality: string; // !
	height: number;
	weight: number;
	position: string; // !
	foot: string; // !
	teamId: Id | null;
	teamName: string | null;
	jersey: number | null;
}

export const generatePlayerText = (p: PlayerI): string => p.name;

