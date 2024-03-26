// YOU HAVE TO MANUALLY PUT .JS AT THE END OF LOCAL INPUTS OR IT'S NOT GONNA WORK XDXDXDDXDXDXDDDDDXDD
import { Telegraf } from "telegraf";
import artemDaun from "./cmds/artem-daun.js";
import { getJoke } from "./cmds/get-joke.js";
import { getAmountOfJokes } from "./cmds/amount-of-jokes.js";
import { addJoke } from "./cmds/admin/add-joke.js";
import { listAllJokes, nextListPage, previousListPage, refreshPages } from "./cmds/list-jokes.js";
import { deleteJoke } from "./cmds/admin/delete-joke.js";
import { BOT_TOKEN } from "./constants.js";


const bot = new Telegraf(BOT_TOKEN);

bot.command("artemdaun", artemDaun);
bot.command("egg", getJoke);
bot.command("egg_amount", getAmountOfJokes);
bot.command("add", addJoke);
bot.command("delete", deleteJoke);
bot.command("remove", deleteJoke);
bot.command('list', listAllJokes);

bot.action('previous', previousListPage);
bot.action('next', nextListPage);

bot.launch();
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
