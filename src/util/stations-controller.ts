import { stations } from "./stations-data";

export class DBConnector {
	// TODO: bun doesn't support HRANA yet, using dummy json till then
	// https://github.com/libsql/hrana-client-ts/issues/5
	// db: Client;

	constructor() {
		// const dbUrl = Bun.env.DB_URL;
		// const dbAuthToken = Bun.env.DB_TOKEN;
		// if (dbUrl === undefined || dbAuthToken === undefined) {
		// 	throw new Error(
		// 		"DB_URL and DB_AUTH_TOKEN must be set in the environment"
		// 	);
		// }
		// this.db = createClient({
		// 	url: dbUrl,
		// 	authToken: dbAuthToken,
		// });
	}

	// async getStations() {
	// 	const res = await this.db.execute("SELECT * FROM stations");
	// 	console.table(res);
	// 	return res;
	// }
	//
	async getStations(): Promise<{ id: number; station_name: string }[]> {
		return Promise.resolve(stations);
	}
}
