const mongoose = require('mongoose');
const config = require('../../slappey.json');

const GuildConfigSchema = new mongoose.Schema({
	guildId: {
		type: mongoose.SchemaTypes.String,
		required: true,
		unique: true,
	},
	prefix: {
		type: mongoose.SchemaTypes.String,
		default: config.prefix,
	}
})

module.exports = mongoose.model("GuildConfig", GuildConfigSchema);