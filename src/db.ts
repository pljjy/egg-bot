// @ts-ignore
import dbConfig from "../db.config.json" assert { type: "json" };
import pg, { QueryResultRow } from "pg";

// admins that are allowed to manage jokes
export const admins: Array<number | undefined> = [783627342, 838340756];

const client = new pg.Client(dbConfig);
client.connect().then(() => console.log("Connected to the database"));

export async function dbQuery(query: string) {
  return await client.query(query);
}

