import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPanel from "@/components/MainPanel";
import Home from "@/pages/Home";
import Tournaments from "@/pages/Tornaments";
import Games from "@/pages/Games";
import Teams from "@/pages/Teams/";
import TeamPage from "@/pages/Teams/TeamPage";
import Players from "@/pages/Players";
import PlayerPage from "./pages/Players/PlayerPage";

export default function Router() {
	return (
		<BrowserRouter>
			<MainPanel>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/torneios" element={<Tournaments />} />
					<Route path="/jogos" element={<Games />} />
					<Route path="/times" element={<Teams />} />
					<Route path="/times/:id" element={<TeamPage />} />
					<Route path="/jogadores" element={<Players />} />
					<Route path="/jogadores/:id" element={<PlayerPage />} />
				</Routes>
			</MainPanel>
		</BrowserRouter>
	);
}

