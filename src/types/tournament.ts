import { Entity, Id } from "@/types/entity";

export interface StandingsI {
	position: number;
	teamId: Id;
	points: number;
	games: number;
	wins: number;
	draws: number;
	losses: number;
	goalsScored: number;
	goalsSuffered: number;
	yellowCards: number;
	redCards: number;
}

export interface TournamentI extends Entity {
	name: string;
	year: number;
	standings: StandingsI[];
}

export const generateTournamentText = (t: TournamentI) => `${t.name} (${t.year})`;

