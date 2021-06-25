const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class ServersCommand extends BaseCommand {
  constructor() {
    super('servers', 'developer', []);
  }

  run(client, message, args) {
    if(message.member.id != 339813312625901579) {
      message.reply("You're not bozho so u cant use this command soz mate");
    } else {
      const guilds = client.guilds.cache.array();
      for(const guild of guilds) {
        message.channel.send(guild.name +  " - " + guild.id);
      }
    }
  }
}