import { Client } from "discord.js";
import CommandHandler from '../core/kevin';
import { Logger } from '../core/logger';
import { VERSION } from '../version';

export default (client: Client): void => {
  client.on("ready", async () => {
    if (!client.user || !client.application) {
      return;
    }

    Logger.get('Bot').info(`${client.user.username} (LexBot v${VERSION}) is online`);
    CommandHandler.init(client);
  });
};