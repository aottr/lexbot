import { Client, GatewayIntentBits, Partials } from "discord.js";
import { Logger } from "./core/logger";
import loader from './core/loader';
import { exit } from "process";
import mongo from "./core/mongo";
import { MissingDiscordToken } from "./core/errors";
require('dotenv').config()


if (!process.env.TOKEN) {
  Logger.get('LEXBOT').error(new MissingDiscordToken().message);
  exit(1);
}
Logger.get('LEXBOT').info("Bot is starting...");

if (process.env.MONGO_BACKEND && process.env.MONGO_BACKEND.toLowerCase() == 'true')
  mongo().catch(err => {
    Logger.get('LEXBOT').error(err.message);
    exit(1);
  });

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
  ],
  partials: [Partials.Channel],
});

client.login(process.env.TOKEN);

loader('../events/', client);
loader('../mods/', client);
