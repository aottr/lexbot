import { CommandInteraction, Client, ApplicationCommandType, PermissionFlagsBits } from "discord.js";
import { Command } from "../interfaces/command";
import { VERSION } from '../version';

export = {
  name: "version",
  description: "Version of the bot",
  defaultMemberPermissions: PermissionFlagsBits.Administrator,
  type: ApplicationCommandType.ChatInput,
  run: async (client: Client, interaction: CommandInteraction) => {

    const content = `LexBot version \`${VERSION}\` by AlexOttr.`;
    await interaction.reply({
      ephemeral: interaction.guildId ? true : false,
      content
    });
  }
} as Command;