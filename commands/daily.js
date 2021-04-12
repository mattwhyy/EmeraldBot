const profileModel = require("../models/profileSchema");
module.exports = {
  name: "daily",
  permissions: [],
  cooldown: 86400,
  description: "Get your daily bars!",
  async execute(client, message, args, Discord, profileData) {
    const target = [message.author.id]
    const randomNumber = Math.floor(Math.random() * 750) + 1;

    const error = new Discord.MessageEmbed() 
    .setColor('207144')
    .setTitle('It looks like there was an error! Please use the command like stated down below!')
    .setDescription('`(prefix)daily`') 

    try {
      const targetData = await profileModel.findOne({ userID: target });
      if (!targetData) return message.channel.send(error);

      await profileModel.findOneAndUpdate(
        {
          userID: target,
        },
        {
          $inc: {
            bars: randomNumber,
          },
        }
      );

        const DAILYEMBED = new Discord.MessageEmbed() 
        .setColor('207144')
        .setTitle('Daily')
        .setDescription(`Sucessfully redeemed your daily reward of ${randomNumber}<:HPbar:830500268089147424>! Come back tommorow to claim it again.`) 
        return message.channel.send(DAILYEMBED);
    } catch (err) {
      console.log(err);
    }
  },
}; 