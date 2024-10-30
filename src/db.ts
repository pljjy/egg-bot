// @ts-ignore
import dbConfig from "../db.config.json" assert { type: "json" };
import pg from "pg";

// i don't think it's a good solution but client connection stops pretty quick with just declaring it once
export async function dbQuery(query: string) {
    const client = new pg.Client(dbConfig);
    await client.connect();   
    const result = await client.query(query);
    await client.end();
    return result;
}

// IF YOU ARE USING IT LOCALLY
// {
//   "host": "localhost",
//   "user": "postgres",
//   "port": 5432,
//   "password": "1234",
//   "database": "EggJokes"
// }

