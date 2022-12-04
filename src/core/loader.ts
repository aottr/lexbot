import { Client } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';

export default async (path: string, client: Client) => {

  const files: string[] = readdirSync(join(__dirname, path)).filter(
    (file) => file.endsWith('.js') || file.endsWith('.ts')
  );

  for (const file of files) {
    const { default: loadable } = await import(join(__dirname, path, file));
    loadable(client);
  }
};