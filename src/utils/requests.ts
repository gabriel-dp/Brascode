import { Id } from "@/types/entity";

type Complement = "players" | "teams" | "tournaments" | "games" | `ranking/${string}` | `statistics/${string}`;

export class ApiRequest {
	static readonly BASE_URL: string = `${import.meta.env.VITE_API_URL}`;

	private constructor() {} // Prevents instancing

	private static fullUrl(complement: Complement): string {
		return this.BASE_URL + "/" + complement;
	}

	static getUrlAll(complement: Complement) {
		return this.fullUrl(complement);
	}

	static getUrlById(complement: Complement, id: Id): string {
		return this.fullUrl(complement) + "/" + id;
	}

	static getUrlByFilters(complement: Complement, ...args: { [key: string]: string | number | undefined }[]): string {
		let finalUrl = this.fullUrl(complement);
		let isFirst = true;

		for (const filter of args) {
			const [key, value] = Object.entries(filter)[0];
			if (!value) continue; // Ignores undefined filters

			finalUrl += isFirst ? "?" : "&";
			finalUrl += key + "=" + value;

			if (isFirst) isFirst = false;
		}

		return finalUrl;
	}
}

