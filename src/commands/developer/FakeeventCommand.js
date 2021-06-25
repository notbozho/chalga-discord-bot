const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class FakeeventCommand extends BaseCommand {
  constructor() {
    super('fakeevent', 'developer', []);
  }

  run(client, message, args) {
    if(message.member.id != 339813312625901579) {
      message.reply("You're not bozho so u cant use this command soz mate");
    } else {
      client.emit(args[0], message.guild);
      message.reply('done shefe :)')
    }
  }
}