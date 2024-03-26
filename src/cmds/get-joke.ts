import { dbQuery } from "../db.js";
import { Context } from "telegraf";

export async function getJoke(ctx: Context) {
  if (ctx.text!.split(" ").length > 1) {
    try {
      const text = (
        await dbQuery(
          `SELECT text FROM jokes WHERE id = ${+ctx.text!.split(" ")[1]};`
        )
      ).rows[0].text;
      await ctx.reply(text);
    } catch (e) {
      await ctx.reply("такого айди нет");
    }
  } else {
    const text = (
      await dbQuery(
        "SELECT text FROM jokes OFFSET floor(random() * (SELECT COUNT(*) FROM jokes)) LIMIT 1;"
      )
    ).rows[0].text;
    await ctx.reply(text);
  }
}