import { ReactNode } from "react";

import Navbar from "@/components/Navbar";

import { MainContainer, Screen } from "./style";

interface ParentProps {
	children: ReactNode;
}

export default function MainPanel(props: ParentProps) {
	return (
		<Screen>
			<Navbar />
			<MainContainer>{props.children}</MainContainer>
		</Screen>
	);
}

