const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class SkipCommand extends BaseCommand {
  constructor() {
    super('skip', 'music', []);
  }

  run(client, message, args) {
    // TODO skip current playing song in guild
  }
}