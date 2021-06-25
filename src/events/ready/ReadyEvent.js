const BaseEvent = require('../../utils/structures/BaseEvent');

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run (client) {
    const servers = await client.guilds.cache.size;
    const users = await client.users.cache.size;

    console.log(`\n${client.user.tag} is online!\n → Guild count: ${servers}\n → User count: ${users}\n`);

    // load status
    client.user.setActivity('мазна чалга 🎶', { type: 'LISTENING' });

  }
}