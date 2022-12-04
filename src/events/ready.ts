import { Client, Events } from "discord.js";
import CommandHandler from '../core/kevin';
import { Logger } from '../core/logger';
import { VERSION } from '../version';

export default (client: Client): void => {
  client.once(Events.ClientReady,  async () => {
    if (!client.user || !client.application) {
      return;
    }

    Logger.get('LEXBOT').info(`${client.user.username} (LexBot v${VERSION}) is online`);
    CommandHandler.init(client);
  });
};