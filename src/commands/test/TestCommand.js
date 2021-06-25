const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super('test', 'testing', []);
  }

  async run(client, message, args) {
    // if (args[1] == 'delete') 
    
    console.log(client.radios.has(message.guild.id))
  }
}