import { useEffect, useRef, useState } from "react";

import { Entity } from "@/utils/types";
import { stringIncludes, stringMatches } from "@/utils/strings";

import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdCheck } from "react-icons/md";
import { DropdownContainer, DropdownHeader, DropdownContent, DropdownItem } from "./styles";
import Searchbar from "../Searchbar";

interface DropdownOptionsI {
	title: string;
	items: Entity[];
	selected: Entity | null;
	setSelected: React.Dispatch<React.SetStateAction<Entity | null>>;
	loading: boolean;
	textInput?: boolean;
}

export default function DropdownOptions(props: DropdownOptionsI) {
	const dropdownRef = useRef<HTMLDivElement>(null);

	const [search, setSearch] = useState("");
	const [matchSearch, setMatchSearch] = useState<Entity[]>(props.textInput ? [] : props.items);

	const [isOpen, setIsOpen] = useState(false);
	const toggleOpen = () => setIsOpen(!isOpen);

	// Triggers when click the clear input option
	const handleClearClick = () => {
		props.setSelected(null);
		if (props.textInput) {
			if (search == "") setIsOpen(false);
			setSearch("");
		}
	};

	// Triggers when click on a item
	const handleItemClick = (item: Entity) => {
		props.setSelected(item);
		if (props.textInput) setSearch(item.text);
		setIsOpen(false);
	};

	// Controls which items will appear as options
	useEffect(() => {
		if (props.textInput) {
			// Opens menu when user is typing
			if (search != "" && (props.selected == null || !stringMatches(search, props.selected.text))) {
				setIsOpen(true);
			}

			// Clear selection if user edit when element was selected
			if (props.selected != null && !stringMatches(search, props.selected.text)) {
				props.setSelected(null);
			}

			setMatchSearch(props.items.filter((item) => stringIncludes(item.text, search)).slice(0, 10));
		}
	}, [search, props]);

	// Controls outside clicks
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const PLACEHOLDER = "Nome do Time";

	return (
		<DropdownContainer ref={dropdownRef}>
			<DropdownHeader onClick={toggleOpen} loading={props.loading.toString()}>
				{props.textInput ? (
					<Searchbar placeholder={PLACEHOLDER} value={search} setValue={setSearch} />
				) : (
					<p>{props.selected ? props.selected.text : PLACEHOLDER}</p>
				)}
				<div className="icon">
					{props.selected ? <MdCheck /> : isOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
				</div>
			</DropdownHeader>
			{isOpen && (
				<DropdownContent>
					<DropdownItem className="clear" onClick={handleClearClick}>
						<p>-- Cancelar --</p>
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

