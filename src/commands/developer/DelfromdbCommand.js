const BaseCommand = require('../../utils/structures/BaseCommand');
const GuildConfig = require('../../schemas/GuildConfigSchema');

module.exports = class DelfromdbCommand extends BaseCommand {
  constructor() {
    super('delfromdb', 'developer', []);
  }

  async run(client, message, args) {
    const guildId = message.guild.id;
    
    if(message.member.id != 339813312625901579) {
        message.reply("You're not bozho so u cant use this command soz mate");
    } else {

      try {
        const RemoveGuild = await GuildConfig.findOneAndDelete({ guildId });
        message.reply(`Guild - ${message.guild.id} removed from db.`);
      } catch (err) {
        message.reply("there was an error.");
        console.error(err);
      }

    }

  }
}