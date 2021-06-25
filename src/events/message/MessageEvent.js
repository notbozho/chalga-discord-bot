const BaseEvent = require('../../utils/structures/BaseEvent');
const config = require('../../../slappey.json');

module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super('message');
  }
  
  async run(client, message) {
    if (message.author.bot) return;
    const { prefix } = client.configs.get(message.guild.id);
    if (message.content.startsWith(prefix)) {
      const [cmdName, ...cmdArgs] = message.content
      .slice(prefix.length)
      .trim()
      .split(/\s+/);
      const command = client.commands.get(cmdName);
      if (command) {
        command.run(client, message, cmdArgs);
        message.delete({ timeout: 5000 })
      }
    }
  }
}