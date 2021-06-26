const BaseCommand = require('../../utils/structures/BaseCommand');
const RadioConfig = require('../../schemas/RadioConfigSchema');
const config = require('../../../slappey.json');
const disbut = require('discord-buttons');
const { MessageEmbed } = require('discord.js');

module.exports = class SetupCommand extends BaseCommand {
  constructor() {
    super('setup', 'admin', []);
  }

  async run(client, message, args) {
    const { member, guild } = message;
    const guildId = guild.id;
    let successful = false;


    const doneButton = new disbut.MessageButton()
      .setStyle('blurple')
      .setLabel('Готово!')
      .setID('setupDone');

    // const doneButton_disabled = new disbut.MessageButton()
    //   .setStyle('blurple')
    //   .setLabel('Готово!')
    //   .setID('setupDone')
    //   .setDisabled();

    //!
    //! EMBEDS
    //!

    const setupEmbed = new MessageEmbed()
      .setTitle('Конфигурация на радио')
      .setDescription(`\n**Стъпка 1.** Влез в канала, в който искаш да пускам 24/7 мазнотии 🎶\n\n` + 
      `**Стъпка 2.** Натисни бутона "Готово!" долу.\n\n **ВАЖНО!** Имаш само 90 секунди да натиснеш бутона. Ако не успееш използвай \`${client.configs.get(guild.id).prefix}setup\` отново!`)
      .setTimestamp()
      .setFooter(guild.name, guild.iconURL())
      .setColor(config.mainColor);

    const setupSuccessfulEmbed = new MessageEmbed()
      .setTitle('Конфигурация на радио')
      .setDescription(`\nКонфигурацията на радиото за ${guild.name} бе успешна!\n\n**СЪВЕТ**: *Ако не съм в гласовия канал можеш да ме подкараш с \`${client.configs.get(guildId).prefix}radio\` командата* `)
      .setColor(config.successColor)
      .setTimestamp()
      .setFooter(guild.name, guild.iconURL());

    const notJoinedVChannelEmbed = new MessageEmbed()
      .setTitle('Проблемче...')
      .setDescription(`\nМоля __първо влез__ в канала, в който искаш да \nпускам 24/7 мазнотии 🎶 и __след това__ натисни бутона "Готово!"\n\n Можеш да опиташ пак 😉`)
      .setTimestamp()
      .setFooter(guild.name, guild.iconURL())
      .setColor(config.errorColor);

    const buttonTimeoutEmbed = new MessageEmbed()
      .setTitle('⏰ Тик так... тик так...')
      .setDescription(`\nВремето изтече! Моля използвай \`${client.configs.get(guild.id).prefix}setup\` отново ако искаш да конфигурираш радиото.\n`)
      .setTimestamp()
      .setFooter(guild.name, guild.iconURL())
      .setColor(config.errorColor);

    const m = await message.channel.send({ embed: setupEmbed, component: doneButton});

    const filter = (button) => button.clicker.user.id === message.author.id;
    const collector = await m.createButtonCollector(filter, { time: 90000 })

    //-!
    //-! NOT FUN PART
    //-!

    collector.on('collect', async (b) => {
      if(member.voice.channel) {

        // TODO save to db

        const findRadioConfig = await RadioConfig.findOne({ guildId });

        if(findRadioConfig) {
          try {

            const updateRadioConfig = await RadioConfig.findOneAndUpdate({ guildId }, { guildId, voiceId: member.voice.channel.id}).then(() => {
              client.radios.set({ guildId }, {
                guildId,
                voiceId: member.voice.channel.id
              });
          
              console.log(`Radio (${guild.name} | ${guild.id}) was updated into DB & map smoothly... 🎶`);

            })

          } catch (err) { console.error(err) }
        } else {
          try {

            const createRadioConfig = await RadioConfig.create({ guildId, voiceId: member.voice.channel.id }).then(() => {
              client.radios.set( guildId , {
                guildId,
                voiceId: member.voice.channel.id
              });
  
              console.log(`Radio (${guild.name} | ${guild.id}) was added into DB & map smoothly... 🎶`);
            
            });

          } catch (err) { console.error(err) }

        }

        successful = true;

        m.edit({ embed: setupSuccessfulEmbed, component: doneButton.setDisabled() })
          .then(msg => {
              msg.delete({ timeout: 15000 });
          });

      } else {

        message.channel.send(notJoinedVChannelEmbed).then(msg => {
          msg.delete({ timeout: 15000 });
        });

      }
      
      b.defer(); // Tell discord api that the button interaction is successful

      });

      collector.on('end', collected => {
        if(!successful) {

          m.edit({ embed: buttonTimeoutEmbed, component: doneButton.setDisabled() }).then(msg => {
            msg.delete({ timeout: 15000 });
          });

        }
      })
    };

}