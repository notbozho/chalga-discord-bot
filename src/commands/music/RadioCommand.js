const { MessageEmbed } = require('discord.js');
const disbut = require('discord-buttons');

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

      const setupButton = new disbut.MessageButton()
        .setStyle('red')
        .setLabel('Конфигурирай!')
        .setID('goSetup');

      if(!findRadioConfig) {

        const m = await message.channel.send({embed: setupMissingEmbed, component: setupButton});

        const filter = (button) => button.clicker.user.id === message.author.id;
        const collector = await m.createButtonCollector(filter, { time: 90000 })

        collector.on('collect', async (b) => {
        
          m.edit({ embed: setupMissingEmbed, component: setupButton.setDisabled() });
          m.delete({ timeout: 3000 });
          
          //execute b!setup command
          const command = client.commands.get('setup');
          command.run(client, message, []);

          await b.defer(); // Tell discord api that the button interaction is successful
        
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