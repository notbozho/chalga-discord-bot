// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-rateLimit
const BaseEvent = require('../utils/structures/BaseEvent');
module.exports = class RateLimitEvent extends BaseEvent {
  constructor() {
    super('rateLimit');
  }
  
  async run(client, rateLimitInfo) {
    
    console.log(rateLimitInfo)
  }
}