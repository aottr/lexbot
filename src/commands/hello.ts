import { CommandInteraction, Client, ApplicationCommandType, Constants, PermissionFlagsBits, ApplicationCommandOptionData, ApplicationCommandOptionType } from "discord.js";
import { Command } from "../interfaces/command";

export = {
  name: "hellowelt",
  description: "Returns a greeting",
  defaultMemberPermissions: PermissionFlagsBits.KickMembers | PermissionFlagsBits.BanMembers,
  type: ApplicationCommandType.ChatInput,
  cooldown: 5000,
  options: [{
            name: 'limit',
            description: 'Number of Otters to fetch',
            required: false,
            type: ApplicationCommandOptionType.Number,
        } as ApplicationCommandOptionData,],
  run: async (client: Client, interaction: CommandInteraction) => {
    const content = "Hello there!";

    await interaction.reply({
      ephemeral: true,
      content
    });
  }
} as Command;