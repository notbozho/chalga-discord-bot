const BaseCommand = require('../../utils/structures/BaseCommand');
const GuildConfig = require('../../schemas/GuildConfigSchema');
const config = require('../../../slappey.json');

const { MessageEmbed } = require('discord.js');

module.exports = class SetprefixCommand extends BaseCommand {
  constructor() {
    super('setprefix', 'Admin', []);
  }

  async run(client, message, args) {
    const guildId = message.guild.id;
    const prefix = args[0];
    
    try {
      const guildConfigDB = await GuildConfig.findOneAndUpdate(
        { guildId },
        { prefix },
        { new : true }
      );

      client.configs.set(guildId, {
        guildId,
        prefix: prefix,
      });

      const em = new MessageEmbed()
        .setTitle(`Prefix-ът на този сървър бе сменен на: ${prefix}`)
        .setColor(config.successColor)
        .setFooter(message.guild.id, message.guild.iconURL())
        .setTimestamp();

      message.channel.send(em).then(msg => {
        msg.delete({ timeout: 7000 });
      });

    } catch (err) {
      console.error(err);
    }
  }
}