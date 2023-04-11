/**
 *  Basic logger class with singleton model
 *
 * @author AlexOttr <alex@tailbyte.org>
 * @version 1.1
 *
 * @exports Logger
 */
export class Logger {

  private static registered: Map<string, Logger> = new Map<string, Logger>();
  private readonly name: string;
  private readonly printTime: boolean;

  private constructor(name: string, printTime: boolean) {
    this.name = name;
    this.printTime = printTime;
  }

  public static register(name: string, printTime: boolean = false): Logger {
    const logger = new Logger(name, printTime);
    Logger.registered.set(name, logger);
    return logger;
  }

  public static get(name: string): Logger {
    let logger = Logger.registered.get(name);
    if (!logger) {
      logger = Logger.register(name, false);
    }
    return logger;
  }

  /**
   * Log info message
   * @param message Message to log
   */
  public info(message: unknown) {
    this.log('\x1b[32mINFO\x1b[0m', message as string);
  }

  public error(message: unknown) {
    this.log('\x1b[1;31mERROR\x1b[0m', message as string);
  }

  public debug(message: unknown) {
    this.log('\x1b[33mDEBUG\x1b[0m', message as string);
  }

  private log(prefix: string, message: string) {
    let output = `${prefix} [${this.name}]`;
    if (this.printTime) output += ` \x1b[36m${this.time()}\x1b[0m`;

    console.log(output, message);
  }

  private time(): string {
    return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  }
}
export default Logger;
