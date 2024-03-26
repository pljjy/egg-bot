// YOU HAVE TO MANUALLY PUT .JS AT THE END OF LOCAL INPUTS OR IT'S NOT GONNA WORK XDXDXDDXDXDXDDDDDXDD
import { Context, Telegraf } from "telegraf";
import dotenv from "dotenv";
import artemDaun from "./cmds/artem-daun.js";
import { getJoke, getAmountOfJokes, addJoke, listAllJokes } from "./cmds/db.js";

dotenv.config();
const bot = new Telegraf(process.env.BOT_TOKEN as string);

bot.command("artemdaun", artemDaun);
bot.command("egg", getJoke);
bot.command("egg_amount", getAmountOfJokes);
bot.command("add", addJoke);
bot.command('list', listAllJokes);

bot.launch();
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
