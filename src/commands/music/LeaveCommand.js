const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class LeaveCommand extends BaseCommand {
  constructor() {
    super('leave', 'music', []);
  }

  run(client, message, args) {
    if(message.guild.me.voice.channel) {
      message.guild.me.voice.channel.leave();
    } else {
      message.reply('im not in a voice channel u blind fuck 😂')
    }
  }
}