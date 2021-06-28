const fs = require('fs');

const path = 'E:\\[3] Java Script\\[1] Projects\\radio-bot\\music\\';

function getRandomSongFile() {
	let files = fs.readdirSync(path);

	while (true) {
		audio = files[Math.floor(Math.random() * files.length)];
		if(audio.endsWith('.mp3')) break;
	}
	
	return audio;
}

function getRandomOtherSongFile(lastSong) {
	let files = fs.readdirSync(path);
	let foundSong = lastSong;


	while (foundSong != lastSong) {
		audio = files[Math.floor(Math.random() * files.length)];
		if(audio.endsWith('.mp3')) {
			foundSong = audio;
		};
	}
	
	return audio;
}

async function PlayRadio(channel) {
	// TODO implement joining channel and playing radio

	if(channel.type != 'voice') return;


    const song = await getRandomSongFile();
    const connection = await message.member.voice.channel.join();

    connection.play(fs.createReadStream(`${path}${song}`));

    dispatcher.on('start', () => {
	    console.log(`${song} started playing in ${channel.guild.name}`);
    });

    dispatcher.on('finish', () => {
        PlaySong(channel);
    });


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

			await voiceChannel.join();

			console.log(`Joined Voice Channel in ${guild.name}`)

                PlayRadio(voiceChannel);
                console.log(`Started radio in ${guild.name}`)

			// -FIXME cannot join undefined random error
		}

	}
}

const statuses = [
    {
        status: 'idle', // online, idle, dnd or invisible
        type: 'PLAYING', // PLAYING, WATCHING, LISTENING, STREAMING, COMPETING
        text: 'с музика 🎙', // whatever :p
    },
    {
        status: 'online',
        type: 'LISTENING',
        text: 'мазна чалга 🎶',
    },
    {
        status: 'online',
        type: 'WATCHING',
        text: 'майка ти 😊',
    },
]

async function autoStatus(client) {
    let step = 0;

    setInterval(() => {

        const status = statuses[step].status;
        const type = statuses[step].type;
        const text = statuses[step].text;

        client.user.setPresence({activity: {name: text, type: type}, status: status });

        if(step == statuses.length - 1) step = 0;
        else step++;

    }, 8 * 1000); // every 8 seconds
}

module.exports = { getRandomSongFile, getRandomOtherSongFile, PlayRadio, joinAllRadioChannels, autoStatus };