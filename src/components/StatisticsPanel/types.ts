import { IconType } from "react-icons";
import { MdSportsSoccer, MdHandshake } from "react-icons/md";

import { Statistics } from "@/types/player";

import { Card } from "./styles";

export interface CounterIcon {
	title: string;
	icon: IconType;
	iconColor?: string;
}

export const ICONS_STATISTICS: { [key in keyof Statistics]: CounterIcon } = {
	gols: {
		title: "Gols",
		icon: MdSportsSoccer,
	},
	assistencia: {
		title: "Assistências",
		icon: MdHandshake,
	},
	cartao_amarelo: {
		title: "Cartões Amarelos",
		icon: Card,
		iconColor: "#EEEE00",
	},
	cartao_vermelho: {
		title: "Cartões Vermelhos",
		icon: Card,
		iconColor: "#FF0000",
	},
};
