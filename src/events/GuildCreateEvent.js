// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildCreate
const BaseEvent = require('../utils/structures/BaseEvent');
const GuildConfig = require('../schemas/GuildConfigSchema');
const config = require('../../slappey.json');

const { MessageEmbed } = require('discord.js');

module.exports = class GuildCreateEvent extends BaseEvent {
  constructor() {
    super('guildCreate');
  }
  
  async run(client, guild) {
    console.log(`(🚨 NEW GUILD) ID: ${guild.id} ; NAME: ${guild.name} ; MEMBERS: ${guild.memberCount} ; OWNER: ${guild.owner.id}`);

    const guildId = guild.id;

    const guildConfigDB = await GuildConfig.findOne({ guildId });

    if(!guildConfigDB) {
      try {
        const createGuild = await GuildConfig.create({ guildId, prefix: config.prefix })

        client.configs.set(guildId, {
          guildId,
          prefix: config.prefix,
        });

        console.log("Guild added into DB.")

      } catch (err) {
        console.error(err);
      }
    } else {
      console.log("Guild already exists in DB.");
    }

     const welcomeEmbed = new MessageEmbed()
      .setDescription(`\nБлагодаря ти, че ме добави в **${guild.name}** ! \n\n Аз съм радио бот 🎶, ` + 
      `който пуска **чалга/кючеци** и каквото мазно се сетиш в твоят сървър **__24/7__** ! ` +
      `\n\n❗ Ако имаш нужда от помощ или срещаш проблеми можеш да ползваш командата \`${client.configs.get(guildId).prefix}help\` или влез в моя съпорт сървър. `)
      .setColor(config.mainColor)
      .setTimestamp()
      .setFooter(guild.name, guild.iconURL());

    if(guild.me.hasPermission('VIEW_AUDIT_LOG', { checkAdmin: true, checkOwner: true })) {

      const fetchedLogs = await guild.fetchAuditLogs({
        limit: 1,
        type: "BOT_ADD"
      });
      const auditlog = fetchedLogs.entries.first();
      
      welcomeEmbed.setTitle(`Здрасти, ${auditlog.executor.username} 👋!`)
      auditlog.executor.send(welcomeEmbed);
    } else {
      console.log("else")
      const guildOwner = guild.owner.user;
      
      welcomeEmbed.setTitle(`Здрасти, ${guildOwner.username} 👋!`)
      guildOwner.send(welcomeEmbed);
    }

    
  }
}