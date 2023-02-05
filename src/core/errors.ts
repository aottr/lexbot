export class MissingDiscordToken extends Error {
  constructor() {
    super("No Token specified! Bot is unable to start.");
    this.name = "MissingDiscordToken";
  }
}
export class MissingMongoDBEnvironment extends Error {
  constructor() {
    super("Environment is not set up for MongoDB connection");
    this.name = "MissingMongoDBEnvironment";
  }
}
export class NullClient extends Error {
  constructor() {
    super("Client can not be null.");
    this.name = "NullClient";
  }
}