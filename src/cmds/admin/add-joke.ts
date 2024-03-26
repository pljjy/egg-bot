import { admins, dbQuery } from "../../db.js";
import { Context } from "telegraf";

export async function addJoke(ctx: Context) {
  if (!admins.includes(ctx.message?.from.id)) return;

  const temp = ctx.text!.split(" ");
  temp.shift();
  const text = temp.join(" ");
  await dbQuery(`
  WITH joke_count AS (
    SELECT COUNT(*) AS total_jokes FROM jokes
  )
  INSERT INTO jokes (id, text)
  SELECT total_jokes + 1, '${text}'
  FROM joke_count;
  `);
  await ctx.reply("шутка добавлена");
}
