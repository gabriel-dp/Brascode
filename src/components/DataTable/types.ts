import { Id, Entity } from "@/types/entity";

export interface TableEntity {
	id: Id;
	data: object;
	image?: string;
}

export function convertToTableRow<T extends Entity>(entity: T, attrs: string[]): TableEntity {
	const selectedAttrs: Partial<T> = {};
	for (const attr of attrs) {
		if (attr in entity) {
			selectedAttrs[attr as keyof T] = entity[attr as keyof T];
		}
	}
	return { id: entity.id, data: selectedAttrs, image: entity.image };
}

