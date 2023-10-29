import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPanel from "@/components/MainPanel";
import Home from "@/pages/Home";
import Tournaments from "@/pages/Tournaments";
import Games from "@/pages/Games";
import Teams from "@/pages/Teams/";
import TeamPage from "@/pages/Teams/TeamPage";
import Players from "@/pages/Players";
import PlayerPage from "@/pages/Players/PlayerPage";

export enum Pages {
	Home = "/",
	Tournaments = "/torneios/",
	Games = "/jogos/",
	Teams = "/times/",
	Players = "/jogadores/",
}

export default function Router() {
	return (
		<BrowserRouter>
			<MainPanel>
				<Routes>
					<Route path={Pages.Home} element={<Home />} />
					<Route path={Pages.Tournaments} element={<Tournaments />} />
					<Route path={Pages.Games} element={<Games />} />
					<Route path={Pages.Teams} element={<Teams />} />
					<Route path={Pages.Teams + ":id"} element={<TeamPage />} />
					<Route path={Pages.Players} element={<Players />} />
					<Route path={Pages.Players + ":id"} element={<PlayerPage />} />
				</Routes>
			</MainPanel>
		</BrowserRouter>
	);
}

