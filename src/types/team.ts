import { Entity } from "./entity";

export interface TeamI extends Entity {
	name: string;
	abbreviation: string;
	foundation: string; // !
	coach: string;
}

export const generateTeamText = (t: TeamI): string => `${t.name} (${t.abbreviation})`;
