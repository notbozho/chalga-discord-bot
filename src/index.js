// Imports

//discord stuff
const Discord = require('discord.js');
const allIntents = new Discord.Intents;
allIntents.add(Discord.Intents.ALL)
allIntents.remove(['GUILD_MEMBERS', 'GUILD_PRESENCES']);
const Client = new Discord.Client({ ws: { intents: allIntents } });
const client = Client;
const disbut = require('discord-buttons');

const { registerCommands, registerEvents } = require('./utils/registry');

// mongodb stuff
const mongoose = require('mongoose');
const GuildConfig = require('./schemas/GuildConfigSchema');
const RadioConfig = require('./schemas/RadioConfigSchema');

// misc
const config = require('../slappey.json');
const { joinAllRadioChannels } = require('./functions');
disbut(client);


// TODO Multi threading support so bot wont be slow (I hope it improves performance... it should, right?) ;o


(async () => {
  
  client.commands = new Map();
  client.events = new Map();
  client.configs = new Map();
  client.radios = new Map();

  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  
  //load database
  await mongoose.connect(config.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }).then((m) => {
    console.log("Connected to Database.")
  }).catch((err) => console.error(err));


  await client.login(config.token);

  //load prefixes
  const guilds = client.guilds.cache.array();

  for(const guild of guilds) {

    const guildId = guild.id;
    const guildConfigDB = await GuildConfig.findOne({ guildId });
    const radioConfigDB = await RadioConfig.findOne({ guildId });

    // guilds part
    if(guildConfigDB) {
      
      client.configs.set(guildId, guildConfigDB);

    } else {
      try {

        const newGuild = await GuildConfig.create({ guildId, prefix: config.prefix }).then((m) => console.log(`Guild (${guild.name} | ${guildId}) was added into guild DB & map smoothly 😉`) )
      
      } catch (err) { console.error(err) }

      client.configs.set(guildId, {
        guildId,
        prefix: config.prefix,
      });

    }
 
    //radios part
    if(radioConfigDB) {

      client.radios.set(guildId, { guildId, voiceId: radioConfigDB.voiceId })
    
    }
  }

  // join channels on load
  setTimeout(async () => {

    await joinAllRadioChannels(client);

  }, 3000);


})();

