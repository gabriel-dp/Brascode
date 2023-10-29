import { Entity } from "@/types/entity";

export interface TournamentsI extends Entity {
	name: string;
	year: number;
}

export const generateTournamentText = (t: TournamentsI) => `${t.name} (${t.year})`;

