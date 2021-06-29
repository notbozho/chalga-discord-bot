const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const config = require('../../../slappey.json');

module.exports = class NowplayingCommand extends BaseCommand {
  constructor() {
    super('nowplaying', 'music', ['np']);
  }

  async run(client, message, args) {
    const guildId = message.guild.id;
    let currentSong = client.radios.get(guildId).currentSong;
    let formattedSong;

    if(currentSong != '' || currentSong != undefined) {
       formattedSong = currentSong.replace('.mp3', '');
    } else {
      message.reply('Имаше грешка... :\( Моля пиши на \`Bozho#4881\` или опитай пак ');
      return;
    }
    

    const nowPlayingEmbed = new MessageEmbed()
      .setTitle('🎶')
      .setDescription(`\n\nВ момента върви __${formattedSong}__ ...`)
      .setColor(config.mainColor)
      .setTimestamp()
      .setFooter(message.guild.name, message.guild.iconURL());

    const m = await message.channel.send(nowPlayingEmbed);
    m.delete({ timeout: 7000 });


  }
}