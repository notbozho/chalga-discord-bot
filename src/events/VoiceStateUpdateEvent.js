// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-voiceStateUpdate
const BaseEvent = require('../utils/structures/BaseEvent');
const RadioConfig = require('../schemas/RadioConfigSchema');

module.exports = class WoiceStateUpdateEvent extends BaseEvent {
  constructor() {
    super('voiceStateUpdate');
  }
  
  async run(client, oldState, newState) {
    const member = newState.guild.member(newState.id);
    const guildId = newState.guild.id;
    
    if(member == newState.guild.me) {
      // -TODO self server deafean bot and protection against undefeaners
      // console.log(newState);
      if(!newState.serverDeaf) newState.guild.me.voice.setDeaf(true, "Self deaf due performance reasons");
      
      // TODO update radio config when moved to other channel
      if(newState.channelID != client.radios.get(guildId).voiceId) {
        console.log("moved to diff channel instead of configred one")

        console.log(oldState.channelID)
        console.log(newState.channelID)

        // FIXME memory leak

        const updateRadioConfig = await RadioConfig.findOneAndUpdate(guildId, { voiceId: newState.channelID }).then(() => {
          client.radios.set(guildId, { guildId, voiceId: newState.channelID })
        })
        return;
      } else {
        return;
      }
    } else {
      return;
    }



  }
}