import { Client, GatewayIntentBits, Partials } from "discord.js";
import ready from './events/ready';
import interactionCreate from './events/interactionCreate'

import CommandHandler from './core/kevin'

console.log("Bot is starting...");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
  ],
  partials: [Partials.Channel],
});

client.login("");

ready(client);
interactionCreate(client);