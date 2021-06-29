const BaseCommand = require('../../utils/structures/BaseCommand');
const { skipSong } = require('../../functions');
const config = require('../../../slappey.json');

const { MessageEmbed } = require('discord.js');

module.exports = class SkipCommand extends BaseCommand {
  constructor() {
    super('skip', 'music', ['s']);
  }

  async run(client, message, args) {

    let channel;

    const guildId = message.guild.id;
    let currentSong = client.radios.get(guildId).currentSong;

    const skippingEmbed = new MessageEmbed()
      .setTitle(`Дай ми секунда...`)
      .setDescription(`\n\nПрескачам песента __${currentSong.replace(".mp3", "")}__ ...\n\n`)
      .setTimestamp()
      .setFooter(message.guild.name, message.guild.iconURL())
      .setAuthor(message.author.username, message.author.avatarURL())
      .setColor(config.warningColor);
  
    const nowPlayingEmbed = new MessageEmbed()
      .setTitle('Следваща песен !')
      .setColor(config.successColor)
      .setTimestamp()
      .setFooter(message.guild.name, message.guild.iconURL());

    try {
      channel = message.member.voice.channel;
    } catch (err) { console.error(err); }

    if(channel) { const m = await message.channel.send(skippingEmbed); 
      m.delete({ timeout: 3000 });

      setTimeout(() => {
        skipSong(channel)
      }, 500)

      setTimeout(async () => {
        
        currentSong = client.radios.get(guildId).currentSong; 
        const m2 = await message.channel.send(nowPlayingEmbed.setDescription(`Пускам __${currentSong.replace(".mp3", "")}__`));
        
      }, 1000);
   };
    
  }
}