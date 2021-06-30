const BaseEvent = require('../../utils/structures/BaseEvent');
const config = require('../../../slappey.json');

const { MessageEmbed } = require('discord.js');

module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super('message');
  }
  
  async run(client, message) {
    if (message.author.bot) return;

    let prefix;
    if (message.channel.type == 'text' || message.channel.type == 'news') {
        prefix = client.configs.get(message.guild.id).prefix;
    } else if (message.channel.type == 'dm') {
        prefix = 'b!';
        message.reply('Commands are disabled in dms');
        return;
    } else {
        return;
    }

    if (message.content.startsWith(prefix)) {
      const [cmdName, ...cmdArgs] = message.content.toLowerCase()
      .slice(prefix.length)
      .trim()
      .split(/\s+/);

      const command = client.commands.get(cmdName);
      if (command) {
        command.run(client, message, cmdArgs);

        // removing this because may cause a lot of rate limits
        // message.delete({ timeout: 5000 })
      }
    }
  }
}