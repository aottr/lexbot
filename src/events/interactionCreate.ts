import { Client, Interaction, Events } from "discord.js";
import Kevin from '../core/kevin';

export default (client: Client): void => {
  client.on(Events.InteractionCreate, async (interaction: Interaction) => {

    if (interaction.isCommand() || interaction.isContextMenuCommand()) {
      await Kevin.getInstance().handle(interaction);
    }

  });
};