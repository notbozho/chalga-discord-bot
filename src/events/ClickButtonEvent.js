// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildDelete
const BaseEvent = require('../utils/structures/BaseEvent');
module.exports = class GuildDeleteEvent extends BaseEvent {
  constructor() {
    super('clickButton');
  }
  
  async run(client, button) {
    // await button.defer();
    console.log(`button ${button.id} clicked in ${button.guild.name}`);
  }
}