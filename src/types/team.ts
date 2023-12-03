import { Entity } from "@/types/entity";

export interface TeamI extends Entity {
	nome: string;
	abreviacao: string;
	fundacao: string; // date
	tecnico: string;
	cor_primaria: string | null;
	cor_secundaria: string | null;
	pais: string;
}

export const generateTeamText = (t: TeamI): string => `${t.nome} (${t.abreviacao})`;
