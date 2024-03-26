// @ts-ignore
import dbConfig from "../db.config.json" assert { type: "json" };
import pg from "pg";

const client = new pg.Client(dbConfig);
client.connect().then(() => console.log("Connected to the database"));

export async function dbQuery(query: string) {
  return await client.query(query);
}

// IF YOU ARE USING IT LOCALLY
// {
//   "host": "localhost",
//   "user": "postgres",
//   "port": 5432,
//   "password": "1234",
//   "database": "EggJokes"
// }

