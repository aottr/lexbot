import { readdirSync, lstatSync } from 'fs';
import { join } from 'path';
import { ApplicationCommandData, Client, CommandInteraction } from 'discord.js';
import { Command } from '../interfaces/command';
import { Logger } from './logger';
import { NullClient } from './errors';

/**
 *  Command handler to autoload commands
 *
 * @author AlexOttr <alex@ottr.one>
 * @version 2.0
 *
 * @exports Kevin
 */
export default class Kevin {

  private commands: Map<string, Command>;
  private client: Client;
  private prefix: string;
  private cooldown: Map<string, number>;
  private static instance: Kevin;

  private logger: Logger;

  private constructor(client: Client, prefix: string = '!') {
    this.commands = new Map<string, Command>();
    this.cooldown = new Map<string, number>();
    this.client = client;
    this.prefix = prefix;
    this.logger = Logger.register('Kevin');

    this.loadRecursive('../commands/').then(() => {
      this.registerSlashCommands();
    });
  }

  public static init(client: Client, prefix: string = '!'): void {
    Kevin.getInstance(client, prefix);
  }

  public static getInstance(client: Client | null = null, prefix: string = '!'): Kevin {

    if (!Kevin.instance) {
      if (!client) throw new NullClient();
      Kevin.instance = new Kevin(client, prefix);
    }
    return Kevin.instance;
  }

  async handle(interaction: CommandInteraction) {
    const command = this.commands.get(interaction.commandName);
    if (!command) {
      interaction.reply({ ephemeral: true, content: "An error has occurred" });
      Logger.get('Kevin').error('Unknown Command was executed');
      return;
    }

    if (this.cooldown.get(`slash-${command.name}.${interaction.user.id}`))
      return await interaction.reply({
        ephemeral: true,
        content: `You are on ${Math.floor((this.cooldown.get(`slash-${command.name}.${interaction.user.id}`)! - Date.now()) / 1000)}s cooldown!`
      });

    command.run(this.client, interaction);

    if (command.cooldown) {
      this.cooldown.set(
        `slash-${command.name}.${interaction.user.id}`,
        Date.now() + command.cooldown)
      setTimeout(() => {
          this.cooldown.delete(`slash-${command.name}.${interaction.user.id}`)
      }, command.cooldown)
    }
  }

  private async registerSlashCommands(): Promise<void> {

    let appCommands = new Array<ApplicationCommandData>();
    this.commands.forEach((command) => {
      appCommands.push(command as ApplicationCommandData);
    });

    this.client.application?.commands.set(appCommands);
    this.logger.info(`Successfully reloaded ${appCommands.length} (/) commands.`);
  }

  /**
   * Recursive inner function to call the mods from the given directory
   * @param {string} path
   * @returns {number} sum of loaded mods
   */
  private async loadRecursive(path: string) : Promise<number> {
    let count = 0;
      // recursively read directory for commands
      const entries = readdirSync(join(__dirname, path));
      for (const entry of entries) {
        const stat = lstatSync(join(__dirname, path, entry));
        if (stat.isDirectory()) {
            count += await this.loadRecursive(join(path, entry));
        }
        else {
            if (entry.startsWith('.')) continue;
            const command = await import(join(__dirname, path, entry));
            // call the command
            this.commands.set(command.name, command);
            ++count;
        }
      }
      return count;
  }
}
