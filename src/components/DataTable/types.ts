import { Id, Entity } from "@/types/entity";

export interface TableItem {
	text: string | number;
	image?: string;
}

export interface TableEntity {
	id: Id;
	data: TableItem[];
}

export function getAttrs<T extends Entity>(entity: T, attrs: string[]): Partial<T> {
	const selectedAttrs: Partial<T> = {};
	for (const attr of attrs) {
		if (attr in entity) {
			selectedAttrs[attr as keyof T] = entity[attr as keyof T];
		}
	}
	return selectedAttrs;
}

