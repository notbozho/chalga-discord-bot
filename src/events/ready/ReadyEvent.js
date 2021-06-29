const BaseEvent = require('../../utils/structures/BaseEvent');
const chalk = require('chalk');
const { autoStatus } = require('../../functions.js');

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run (client) {
    const servers = await client.guilds.cache.size;
    const users = await client.users.cache.size;

    console.log(`\n${client.user.tag} is ${chalk.greenBright('online')}!\n → Guild count: ${chalk.blue(servers)}\n → Users count: ${chalk.blue(users)}\n`);

    // load auto status
    await autoStatus(client);

  }
}