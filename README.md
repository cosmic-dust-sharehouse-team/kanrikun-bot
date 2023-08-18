## About
The `kanrikun-bot` is a Discord bot designed for facility management tasks. Utilizing the Discord.js library, the bot monitors specific channels for users' reactions on messages. When a user reacts with a predefined emoji, the bot recognizes the type of task completed, such as vacuuming, kitchen cleaning, or washing, based on the emoji used. It then responds by sending a custom message embedded in a notification to a target channel, praising the user for their action.

## How to Use
Before running the bot, you'll need to set up your Discord token.
### Step 0: Install discord.js and notion-sdk-js
Install the recommended version 13 of discord.js to your local repository.
```
npm install discord.js@v13-lts
```
### Step 1: Create the Configuration File
Create a new file named `token.json` in the root directory of your project.
### Step 2: Add the Token
You can easily get the channel ID by setting dev mode in Discord app.
Copy and paste the following content into `token.json`:
```json
{
  "DISCORD_BOT_TOKEN": "YOUR_DISCORD_BOT_TOKEN",
  "MONITORED_DISCORD_CH_ID": "YOUR_DISCORD_CH_ID",
  "TARGET_DISCORD_CH_ID": "YOUR_DISCORD_CH_ID"
}
```
⚠️ Warning: Never commit your token.json with your actual token to any public repositories. It's crucial to keep your Discord bot token confidential.
### Step 3: Run the Bot
Once you have set up your token in the token.json file, you can run your bot using the following command:
```
node kanri-kun.js
```
