import { useMemo, useState } from "react";

import { PlayerI } from "@/types/player";
import { TeamI } from "@/types/team";
import { Id } from "@/types/entity";

import { OptionButton, QuizContainer } from "./styles";

function shuffleElements<T>(elements: T[]): T[] {
	return [...elements].sort(() => 0.5 - Math.random());
}

interface QuizI<T> {
	elements: T[];
	quantity: number;
}

export default function Quiz<T extends TeamI | PlayerI>(props: QuizI<T>) {
	const [selected, setSelected] = useState<Id | null>(null);

	const options = useMemo(() => {
		setSelected(null);
		return shuffleElements(
			props.elements.filter((element) => element.imagem != undefined || element.imagem == "")
		).slice(0, props.quantity);
	}, [props]);
	const correct = useMemo(() => shuffleElements(options)[0], [options]);

	function handleOptionClick(id: Id) {
		if (!selected) setSelected(id);
	}

	return (
		<QuizContainer>
			<div className="image-container">
				<img src={correct.imagem} alt="quiz" draggable={false} />
			</div>
			<div className="options-container">
				{options.map((option) => (
					<OptionButton
						key={option.id}
						className={`${selected == null ? "active" : "deactive"} ${option.id == correct.id ? "correct" : ""} ${
							selected == option.id ? "wrong" : ""
						}`}
						onClick={() => handleOptionClick(option.id)}>
						{option.nome}
					</OptionButton>
				))}
			</div>
		</QuizContainer>
	);
}
