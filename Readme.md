[![GitHub license](https://badgen.net/github/license/ottrone/lexbot)](LICENSE)
![Maintained](https://img.shields.io/badge/maintained-yes-brightgreen)
[![GitHub open issues](https://badgen.net/github/open-issues/ottrone/lexbot)](https://github.com/OttrOne/lexbot/issues)

# LexBot (v3)
Redesigned (Discord) LexBot in TypeScript for Discord.js v14

## Setup
1. Install all dependencies via `npm install` after cloning the repo.

1. Create a `.env`-File and add your Discord bot token.
```
TOKEN=
```
`.env` is part of the `.gitignore` file so changes won't be committed.


If you want to use a MongoDB Backend, add the following variables to `.env`
```
MONGO_BACKEND=True
MONGO_USER=
MONGO_PASS=
MONGO_HOST=
MONGO_DB=
```

## npm Commands
| Command             | Description                             |
| ------------------- | --------------------------------------- |
| `npm run prebuild`  | Extract version from package.json.      |
| `npm run build`     | Build the typescript code.              |
| `npm run start`     | Runs the bot from the built JavaScript. |
| `npm run debug`     | Debug the TypeScript in watch mode.     |