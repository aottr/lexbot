import { Client, GatewayIntentBits, Partials } from "discord.js";
import { Logger } from "./core/logger";
import loader from './core/loader';
import { exit } from "process";
require('dotenv').config()

if(!process.env.TOKEN) {
  Logger.get('LEXBOT').error('No Token specified! Bot is unable to start.');
  exit(1);
}

Logger.get('LEXBOT').info("Bot is starting...");

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