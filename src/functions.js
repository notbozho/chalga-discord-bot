const fs = require('fs');

function getRandomSongFile() {
	let files = fs.readdirSync('E:\\[3] Java Script\\[1] Projects\\radio-bot\\music\\');

	while (true) {
		audio = files[Math.floor(Math.random() * files.length)];
		if(audio.endsWith('.mp3')) break;
	}
	
	return audio;
}

function getRandomOtherSongFile(lastSong) {
	let files = fs.readdirSync('E:\\[3] Java Script\\[1] Projects\\radio-bot\\music\\');
	let foundSong = lastSong;


	while (foundSong != lastSong) {
		audio = files[Math.floor(Math.random() * files.length)];
		if(audio.endsWith('.mp3')) {
			foundSong = audio;
		};
	}
	
	return audio;
}

async function joinAndPlayRadio(channel) {
	// TODO implement joining channel and playing radio
}

async function skipSong(channel) {
	// TODO implement song skipping in 1 guild only
}

async function joinAllRadioChannels(client) {
	const guilds = client.guilds.cache.array()

	//join all radio channels
	for (const guild of guilds) {

		const guildId = guild.id;

		if (client.radios.has(guildId)) {

			const voiceChannelId = client.radios.get(guildId).voiceId;
			const voiceChannel = guild.channels.cache.get(voiceChannelId);
				
			// console.log(voiceChannelId);
			// console.log(voiceChannel);

			await voiceChannel.join();

			console.log(`Joined vc in ${guild.name}`)

			// -FIXME cannot join undefined random error
			// await delay(1000)
		}

	}
}

module.exports = { getRandomSongFile, getRandomOtherSongFile, joinAndPlayRadio, joinAllRadioChannels };