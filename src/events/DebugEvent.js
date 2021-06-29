// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-debug
const BaseEvent = require('../utils/structures/BaseEvent');
module.exports = class ChannelPinsUpdateEvent extends BaseEvent {
  constructor() {
    super('debug');
  }
  
  async run(client, info) {
    // console.log(info);
  }
}