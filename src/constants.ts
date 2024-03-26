import dotenv from "dotenv";
dotenv.config();

export const BOT_TOKEN = process.env.BOT_TOKEN as string;

const _envStringOfAdmins = process.env.ADMINS as string
export const ADMINS: Array<number | undefined> = _envStringOfAdmins
  ? _envStringOfAdmins.split(',').map(Number)
  : []