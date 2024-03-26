import { ADMINS } from "../../constants.js";
import { dbQuery } from "../../db.js";
import { Context } from "telegraf";

export async function deleteJoke(ctx: Context) {
  // TODO: the function should delete jokes by id and ask if user sure if they wanna delete it
  if (!ADMINS.includes(ctx.message?.from.id)) return;

  const temp = ctx.text!.split(" ");
  temp.shift();
  const id = temp.join(" ")
  try{
    const text = (await dbQuery(`SELECT text FROM jokes WHERE id = ${id}`)).rows[0].text
    await dbQuery(`DELETE FROM jokes WHERE id = ${id}`);
    ctx.reply(`удалил шутку с айди #${id}, текст шутки:\n${text}`);
  } catch(e) {
    ctx.reply('шутки с таким айди не существует');
  }
}