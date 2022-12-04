import { CommandInteraction, Client, ApplicationCommandType, PermissionFlagsBits } from "discord.js";
import { Command } from "../interfaces/command";
import { VERSION } from '../version';

export = {
  name: "modping",
  description: "Ping the moderation team",
  type: ApplicationCommandType.ChatInput,
  dmPermission: false,
  run: async (client: Client, interaction: CommandInteraction) => {

    const channel = interaction.channel;
    if (!channel) return;

    await interaction.reply({
        ephemeral: true,
        content: 'Ping has been sent.'
    });
    channel?.send('<@&859626307758063636>')
  }
} as Command;