import { dbQuery } from "../db.js";
import { Context } from "telegraf";

export async function getAmountOfJokes(ctx: Context) {
  const count = (
    await dbQuery("SELECT COUNT(*) FROM jokes")
  ).rows[0].count;
  await ctx.reply(`${count}`);
}