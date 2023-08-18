const { Client, Intents, MessageEmbed } = require("discord.js");
const homekotoba = require("./homekotoba.json"); // もしhomeruオブジェクトが別ファイルに保存されている場合、適切なパスを指定してください
const token = require("./token.json");

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});

const monitoredChannelId = token.MONITORED_DISCORD_CH_ID;
const targetChannelId = token.TARGET_DISCORD_CH_ID;

const emojiMessages = {
  "1141391975149469806": "掃除機をかけました！",
  "1141392636536701099": "台所の清掃をしました！",
  "1141395269213237298": "洗面台の清掃をしました！",
  "1141395787381739617": "フィルターの清掃をしました！",
  "1141397221930188841": "お風呂の清掃をしました！",
  "1141399150097875015": "炊飯をしました！",
  "1141398417080324116": "洗濯をしました！",
  "1141400048077373531": "トイレの清掃をしました！",
  "1141400616153919629": "ゴミ出し（資源ごみ）をしました！",
  "1141400655999811774": "ゴミ出し（燃えるごみ）をしました！",
  "1141400655999811774": "ゴミ出し（燃えるごみ）をしました！",
  "1141512114591244438": "窓ガラスの清掃をしました！",
  "1141401117050286270": "フィルターの交換をしました！",
};

client.once("ready", async () => {
  console.log("Bot is online!");

  const monitoredChannel = client.channels.cache.get(monitoredChannelId);
  if (monitoredChannel && monitoredChannel.isText()) {
    await monitoredChannel.messages.fetch({ limit: 10 });
    console.log("Fetched the last 10 messages from the monitored channel.");
  }
});

client.on("messageReactionAdd", async (reaction, user) => {
  if (
    user.bot ||
    reaction.message.channel.id !== monitoredChannelId ||
    !emojiMessages[reaction.emoji.id]
  )
    return;

  // リアクションの検知ログ
  console.log(
    `Detected reaction: User ${user.tag} reacted with ${reaction.emoji.name} to a message in the monitored channel.`
  );

  const randomPraise = getRandomPraise();
  const targetChannel = client.channels.cache.get(targetChannelId);
  const customMessage = emojiMessages[reaction.emoji.id];

  const embed = new MessageEmbed()
    .setColor("#0099ff")
    .setDescription(
      `<@${
        user.id
      }>が${reaction.emoji.toString()}${customMessage}\n${randomPraise}`
    );

  if (targetChannel) {
    targetChannel
      .send({ embeds: [embed] })
      .then((message) => {
        // 送信したメッセージの内容全体をログに出力
        console.log(`Sent message: ${message.embeds[0].description}`);
      })
      .catch((err) => {
        console.error(
          `Failed to send an embed message to the target channel: ${err.message}`
        );
      });
  }
});

client.on("messageCreate", async (message) => {
  if (message.channel.id !== monitoredChannelId) return;

  const monitoredChannel = client.channels.cache.get(monitoredChannelId);
  if (monitoredChannel && monitoredChannel.isText()) {
    await monitoredChannel.messages.fetch({ limit: 10 });
    console.log("Fetched the last 10 messages from the monitored channel.");
  }
});

function getRandomPraise() {
  const praises = Object.values(homekotoba);
  return praises[Math.floor(Math.random() * praises.length)];
}

client.login(token.DISCORD_BOT_TOKEN);
