const { MessageEmbed } = require('discord.js');

const BaseCommand = require('../../utils/structures/BaseCommand');
const RadioConfig = require('../../schemas/RadioConfigSchema');
const config = require('../../../slappey.json');

const { getRandomSongFile , getRandomOtherSongFile } = require('../../functions');

module.exports = class RadioCommand extends BaseCommand {
  constructor() {
    super('radio', 'music', []);
  }

  async run(client, message, args) {

      const { guild } = message;
      const guildId = message.guild.id;

      const findRadioConfig = await RadioConfig.findOne({ guildId });

      const setupMissingEmbed = new MessageEmbed()
        .setTitle('Проблемче...')
        .setDescription(`\nТози сървър няма конфигурирано радио!\n\n**СЪВЕТ**: *Използвай \`${client.configs.get(guildId).prefix}setup\` или натисни бутона долу.*\n`)
        .setColor(config.errorColor)
        .setTimestamp()
        //.setAuthor(client.user.username, client.user.avatarURL())
        .setFooter(message.guild.name, message.guild.iconURL());

      if(!findRadioConfig) {

        // FIXME add button bellow

        message.channel.send(setupMissingEmbed).then(msg => {
          msg.delete({ timeout: 10000 });
        }) 

      } else {

        const voiceChannelId = client.radios.get(`${guildId}`).voiceId;
        const voiceChannel = guild.channels.cache.get(`${voiceChannelId}`);

        voiceChannel.join();

        console.log(`Joined vc in ${guild.name}`)

      }

      // const voiceChannel = message.member.voice.channel;
      
      const song = getRandomSongFile();
      
      console.log(song);
  }
}