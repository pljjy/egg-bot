// @ts-ignore
import dbConfig from "../../db.config.json" assert { type: "json" };
import { Context } from "telegraf";
import pg from "pg";

// full row
interface Data {
  id: number;
  text: string;
}

// admins that are allowed to manage jokes
const admins: Array<number | undefined> = [783627342];

const client = new pg.Client(dbConfig);
client.connect().then(() => console.log("Connected to the database"));

// TODO: move this to another file please
export async function getJoke(ctx: Context) {
  if (ctx.text!.split(" ").length > 1) {
    try {
      const text = (
        await client.query<{ text: string }>(
          `SELECT text FROM jokes WHERE id = ${+ctx.text!.split(" ")[1]};`
        )
      ).rows[0].text;
      await ctx.reply(text);
    } catch (e) {
      await ctx.reply("такого айди нет");
    }
  } else {
    const text = (
      await client.query<{ text: string }>(
        "SELECT text FROM jokes OFFSET floor(random() * (SELECT COUNT(*) FROM jokes)) LIMIT 1;"
      )
    ).rows[0].text;
    await ctx.reply(text);
  }
}

export async function getAmountOfJokes(ctx: Context) {
  const count = (
    await client.query<{ count: number }>("SELECT COUNT(*) FROM jokes")
  ).rows[0].count;
  await ctx.reply(`${count}`);
}

// ADMIN COMMANDS
export async function addJoke(ctx: Context) {
  if (!admins.includes(ctx.message?.from.id)) return;

  const temp = ctx.text!.split(" ");
  temp.shift();
  const text = temp.join(" ");
  await client.query(`INSERT INTO jokes (text) VALUES ('${text}');`);
  await ctx.reply("Successfully added your joke");
}

export async function deleteJoke(ctx: Context) {
  // TODO: the function should delete jokes by id
  if (!admins.includes(ctx.message?.from.id)) return;
}

export async function listAllJokes(ctx: Context) {
  if (!admins.includes(ctx.message?.from.id)) return;

  const rows = (await client.query<Data>("SELECT * FROM jokes")).rows.map(
    (row) => {
      return `#${row.id}: ${row.text}`;
    }
  );
  const text = rows.join("\n");
  for(let i = 0; i < text.length; i+=10){
    let slice = rows.slice(i, i + 10).join('\n');
    await ctx.reply(slice);
  }
  // TODO: make a .txt file that will contain text, but don't save the file locally, instead just somehow save it in ram and send it as msg
}
