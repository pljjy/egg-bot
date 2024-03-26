import { dbQuery } from "../db.js";
import { Context } from "telegraf";

let pages: Array<string> = [];

export async function refreshPages() {
  const rows = (await dbQuery("SELECT * FROM jokes")).rows.map((row) => {
    return `#${row.id}: ${row.text}`;
  });

  pages = [];
  for (let i = 0; i < rows.length; i += 10) {
    pages.push(rows.slice(i, i + 10).join("\n"));
  }
}

export async function listAllJokes(ctx: Context) {
  await refreshPages();

  await ctx.telegram.sendMessage(
    ctx.chat!.id,
    `Шутки #1 из #${pages.length}\n\n${pages[0]}`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "⬅️", callback_data: "previous" },
            { text: "➡️", callback_data: "next" },
          ],
        ],
      },
    }
  );
}

export async function previousListPage(ctx: Context) {
  let currentPage = parseInt(ctx.text!.slice(7, 9)); // supports only 2 digit numbers and fails when string is changed

  if (currentPage == 1) currentPage = pages.length;
  else currentPage--;

  await ctx.editMessageText(
    `Шутки #${currentPage} из ${pages.length}\n\n${pages[currentPage - 1]}`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "⬅️", callback_data: "previous" },
            { text: "➡️", callback_data: "next" },
          ],
        ],
      },
    }
  );
}

export async function nextListPage(ctx: Context) {
  let currentPage = parseInt(ctx.text!.slice(7, 9)); // supports only 2 digit numbers and fails when string is changed

  if (currentPage == pages.length) currentPage = 1;
  else currentPage++;

  await ctx.editMessageText(
    `Шутки #${currentPage} из ${pages.length}\n\n${pages[currentPage - 1]}`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "⬅️", callback_data: "previous" },
            { text: "➡️", callback_data: "next" },
          ],
        ],
      },
    }
  );
}
