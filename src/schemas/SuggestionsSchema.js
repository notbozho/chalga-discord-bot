const { model, Schema, SchemaTypes } = require('mongoose');

const SuggestionSchema = new Schema({
	userId: {
		type: SchemaTypes.String,
		required: true,
		unique: true,
	},
	userName: {
		type: SchemaTypes.String,
		required: true,
		unique: false
	},
	songLink: {
		type: SchemaTypes.String,
		required: true,
		unique: true,
	},
	status: {
		type: SchemaTypes.String,
		required: true,
		default: 'pending'
	}

})

module.exports = model("Suggestion", SuggestionSchema);