import { CommandInteraction, Client, ApplicationCommandType, PermissionResolvable } from "discord.js";

export interface Command {
    name: string;
    description?: string;
    cooldown?: number;
    type: ApplicationCommandType.ChatInput | ApplicationCommandType.Message | ApplicationCommandType.User;
    defaultMemberPermissions?: PermissionResolvable,
    dmPermission?: boolean,
    run: (client: Client, interaction: CommandInteraction) => void;
}