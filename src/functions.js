const fs = require('fs');
const chalk = require('chalk');

const config = require('../slappey.json');
const { path } = config;

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

	if(channel.type != 'voice') return;

    const song = await getRandomSongFile();
    const guildId = channel.guild.id;

    let connection;

    try {
        connection = await channel.join();
    } catch (err) { console.error(err); }

    const dispatcher = connection.play(fs.createReadStream(`${path}\\${song}`));

    dispatcher.on('start', () => {
	    console.log(`${chalk.underline(song)} started playing in ${chalk.inverse(channel.guild.name)}`);
        channel.client.radios.set(guildId, {
                guildId,
                voiceId: channel.id,
                currentSong: song
        });
    });

    dispatcher.on('finish', () => {
        PlayRadio(channel);
    });

}

async function skipSong(channel) {
    
    if(channel.type != 'voice') return;
    else PlayRadio(channel);
}

async function joinAllRadioChannels(client) {
	const guilds = client.guilds.cache.array()

	//join all radio channels
	for (const guild of guilds) {

		const guildId = guild.id;

		if (client.radios.has(guildId)) {

			const voiceChannelId = client.radios.get(guildId).voiceId;
			const voiceChannel = guild.channels.cache.get(voiceChannelId);

			try {
                await voiceChannel.join();
            } catch (err) { console.error(err);
                setTimeout(async () => {
                    //sometimes it returns VOICE_CONNECTION_ERROR... not much info on this err
                    await voiceChannel.join();
                }, 5 * (60 * 1000));
            }
            
            console.log(`${chalk.red('→')} Joined VC in ${chalk.inverse(guild.name)}`)
            
            PlayRadio(voiceChannel);
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

    }, 10 * 1000); // every 8 seconds
}

module.exports = { getRandomSongFile, getRandomOtherSongFile, PlayRadio, joinAllRadioChannels, autoStatus, skipSong };