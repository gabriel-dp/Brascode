import { useEffect, useState } from "react";

import { Entity } from "@/utils/types";
import { stringIncludes, stringMatches } from "@/utils/strings";

import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { DropdownContainer, DropdownHeader, DropdownContent, DropdownItem } from "./styles";
import Searchbar from "../Searchbar";

interface DropdownOptionsI {
	title: string;
	items: Entity[];
	selected: Entity | null;
	setSelected: React.Dispatch<React.SetStateAction<Entity | null>>;
}

export default function DropdownOptions(props: DropdownOptionsI) {
	const [search, setSearch] = useState("");
	const [matchSearch, setMatchSearch] = useState<Entity[]>([]);

	const [isOpen, setIsOpen] = useState(false);
	const toggleOpen = () => setIsOpen(!isOpen);

	// Triggers when click the clear input option
	const handleClearClick = () => {
		props.setSelected(null);
		setSearch("");
		setMatchSearch([]);
		setIsOpen(false);
	};

	// Triggers when click on a item
	const handleItemClick = (item: Entity) => {
		props.setSelected(item);
		setSearch(item.text);
		setIsOpen(false);
	};

	// Controls which items will appear as options
	useEffect(() => {
		if (search != "" && (props.selected == null || !stringMatches(search, props.selected.text))) setIsOpen(true);
		setMatchSearch(props.items.filter((item) => stringIncludes(item.text, search)).slice(0, 10));
	}, [search, props.items, props.selected]);

	return (
		<DropdownContainer>
			<DropdownHeader onClick={toggleOpen}>
				<Searchbar placeholder="Nome do Time" value={search} setValue={setSearch} />
				<div className="icon">{isOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</div>
			</DropdownHeader>
			{isOpen && (
				<DropdownContent>
					<DropdownItem className="clear" onClick={handleClearClick}>
						<p>-- Limpar seleção --</p>
					</DropdownItem>
					{matchSearch.map((item) => (
						<DropdownItem key={item.id} onClick={() => handleItemClick(item)}>
							<p>{item.text}</p>
						</DropdownItem>
					))}
				</DropdownContent>
			)}
		</DropdownContainer>
	);
}

