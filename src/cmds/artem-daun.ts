import { Context } from "telegraf"
import { getGlobals } from 'common-es'
const { __dirname } = getGlobals(import.meta.url)
import fs from 'fs';

const rootDir = __dirname + '/../..';
export default function artemDaun(ctx: Context){
  const text: string = fs.readFileSync(rootDir + '/assets/artem.txt', 'utf-8' as const);
  ctx.reply(text);
}
