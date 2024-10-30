// YOU HAVE TO MANUALLY PUT .JS AT THE END OF LOCAL INPUTS OR IT'S NOT GONNA WORK XDXDXDDXDXDXDDDDDXDD
import { Telegraf } from "telegraf";
import artemDaun from "./cmds/artem-daun.js";
import { getJoke } from "./cmds/get-joke.js";
import { getAmountOfJokes } from "./cmds/amount-of-jokes.js";
import { addJoke } from "./cmds/admin/add-joke.js";
import { listAllJokes, nextListPage, previousListPage } from "./cmds/list-jokes.js";
import { deleteJoke } from "./cmds/admin/delete-joke.js";
import { BOT_TOKEN } from "./constants.js";
import { dbQuery } from "./db.js";
import { eblan } from "./cmds/eblan.js";

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function wait(hours: number): Promise<void> {
  const milliseconds = hours * 60 * 60 * 1000;
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function randomWaitAndRepeat(): Promise<void> {
  try {
    const randomHours = getRandomInt(1, 10);
    console.log(`Waiting for ${randomHours} hours...`);
    await wait(randomHours);
    console.log(`Finished waiting for ${randomHours} hours!`);
    await bot.telegram.sendMessage(-1001771594947,
      (await dbQuery(
        "SELECT text FROM jokes OFFSET floor(random() * (SELECT COUNT(*) FROM jokes)) LIMIT 1;"
      )).rows[0].text
    );
    await randomWaitAndRepeat();
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Call the function to start the process
randomWaitAndRepeat();

const bot = new Telegraf(BOT_TOKEN);

// mode: xyecoc, though it stops every other command
// bot.on('message', (ctx) => {
//   if(ctx.message.from.id == 5435765150){ // victim id
//     ctx.replyWithPhoto('https://i.ibb.co/r09gq4D/image.png');
    
//   }
// });

bot.command("artemdaun", artemDaun);
bot.command("egg", getJoke);
bot.command("egg_amount", getAmountOfJokes);
bot.command("add", addJoke);
bot.command("delete", deleteJoke);
bot.command("remove", deleteJoke);
bot.command('list', listAllJokes);
bot.command('eblan', eblan)
// bot.command('chatId', (ctx) => {
//   ctx.reply(ctx.message.chat.id + '');
// });


bot.action('previous', previousListPage);
bot.action('next', nextListPage);


bot.launch();
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
