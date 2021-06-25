const mongoose = require('mongoose');
const config = require('../../slappey.json');

const RadioConfigSchema = new mongoose.Schema({
	guildId: {
		type: mongoose.SchemaTypes.String,
		required: true,
		unique: true,
	},
	voiceId: {
		type: mongoose.SchemaTypes.String,
		required: true,
		unique: true,
	},

})

module.exports = mongoose.model("RadioConfig", RadioConfigSchema);