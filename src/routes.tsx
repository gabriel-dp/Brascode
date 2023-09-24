import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "@/components/Navbar";

import Home from "@/pages/Home";
import Tournaments from "./pages/Tornaments";
import Games from "./pages/Games";
import Teams from "./pages/Teams";
import Players from "@/pages/Players";

export default function Router() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/torneios" element={<Tournaments />} />
				<Route path="/jogos" element={<Games />} />
				<Route path="/times" element={<Teams />} />
				<Route path="/jogadores" element={<Players />} />
			</Routes>
		</BrowserRouter>
	);
}

