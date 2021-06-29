// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildDelete
const BaseEvent = require('../utils/structures/BaseEvent');
const GuildConfig = require('../schemas/GuildConfigSchema');
const RadioConfig = require('../schemas/RadioConfigSchema');

module.exports = class GuildDeleteEvent extends BaseEvent {
  constructor() {
    super('guildDelete');
  }
  
  async run(client, guild) {

    const guildId = guild.id;

    const radioConfigDB = await RadioConfig.findOneAndDelete({ guildId }).then(async dr => {
      const guildConfigDB = await GuildConfig.findOneAndDelete({ guildId }).then(d => {
        client.configs.delete(`${guildId}`)

        console.log(`Guild (${guild.name} | ${guild.id}) was removed from both DBs & local maps smoothly 😉`);
      }).catch((err => console.error(err)));
    })
  }
}