import { useEffect, useMemo, useRef, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdCheck } from "react-icons/md";

import { stringIncludes, stringMatches } from "@/utils/strings";
import Searchbar from "@/components/Searchbar";

import { MenuEntity } from "./types";
import { DropdownContainer, DropdownHeader, DropdownContent, DropdownItem } from "./styles";

interface DropdownOptionsI {
	placeholder: string;
	items: MenuEntity[];
	selected: MenuEntity | null;
	setSelected: React.Dispatch<React.SetStateAction<MenuEntity | null>>;
	loading: boolean;
	textInput?: boolean;
	disableClear?: boolean;
	sort?: boolean;
}

export default function DropdownOptions(props: DropdownOptionsI) {
	const [search, setSearch] = useState("");
	const [matchSearch, setMatchSearch] = useState<MenuEntity[]>([]);
	const [isOpen, setIsOpen] = useState(false);

	const items = useMemo(
		() => (props.sort ? props.items.sort((a, b) => a.text.localeCompare(b.text)) : props.items),
		[props.items, props.sort]
	);

	// Switches open/close menu state
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
	const handleItemClick = (item: MenuEntity) => {
		props.setSelected(item);
		if (props.textInput) setSearch(item.text);
		setIsOpen(false);
	};

	useEffect(() => {
		setMatchSearch(props.textInput ? [] : items);
	}, [props, items]);

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

			setMatchSearch(items.filter((item) => stringIncludes(item.text, search)));
		}
	}, [search, props, items]);

	// Controls outside clicks
	const dropdownRef = useRef<HTMLDivElement>(null);
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

	return (
		<DropdownContainer ref={dropdownRef}>
			<DropdownHeader onClick={toggleOpen} loading={props.loading.toString()}>
				{props.textInput ? (
					<Searchbar placeholder={props.placeholder} value={search} setValue={setSearch} />
				) : (
					<p>{props.selected ? props.selected.text : props.placeholder}</p>
				)}
				<div className="icon">
					{props.selected ? <MdCheck /> : isOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
				</div>
			</DropdownHeader>
			{isOpen && (
				<DropdownContent>
					{!props.disableClear && (
						<DropdownItem className="clear" onClick={handleClearClick}>
							<p>-- Cancelar --</p>
						</DropdownItem>
					)}
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

