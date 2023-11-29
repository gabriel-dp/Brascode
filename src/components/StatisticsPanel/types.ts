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
	goalsScored: {
		title: "Gols",
		icon: MdSportsSoccer,
	},
	goalsAssisted: {
		title: "Assistências",
		icon: MdHandshake,
	},
	cardsYellow: {
		title: "Cartões Amarelos",
		icon: Card,
		iconColor: "#EEEE00",
	},
	cardsRed: {
		title: "Cartões Vermelhos",
		icon: Card,
		iconColor: "#FF0000",
	},
};

