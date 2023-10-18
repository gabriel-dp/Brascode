import { Entity } from "./entity";

export interface TournamentsI extends Entity {
	name: string;
	year: number;
}

export const generateTournamentText = (t: TournamentsI) => `${t.name} (${t.year})`;

