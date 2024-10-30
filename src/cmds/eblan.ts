import { Context } from "telegraf";


export function eblan(ctx: Context) {
  if('reply_to_message' in ctx.message!) {
    if('text' in ctx.message.reply_to_message!){
      ctx.reply(`ыыы ${ctx.message.reply_to_message!.text} ыыы`);
    }
  } 
}