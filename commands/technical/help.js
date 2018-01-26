const Discord = require('discord.js');
const fs = require('fs');
const config = require(`./../../config.json`);

module.exports.run = function(bot, command, args, message, updateJSON){
        let help = new Discord.RichEmbed()
        .setColor('#27AE60')
        .addField('e-help', 'gives commands (this)')
        .addField('e-bal <user mention (optional)>', 'gives a users balance')
        .addField('e-pay <amount> <user mention (optional)>', 'sends a user $$')
        .addField('e-pd', 'increase your balance by $50')
        .addField('e-cf <amount>', 'You win you get half your amount added to your balance, lose you lose the amount')
        .addField('e-lottery buy', 'purchases a lottery ticket for $25')
        .addField('e-draw', 'draws the winning lottery ticket')
        .addField('e-rank <user mention (optional)>', 'gives a users rank')
        .addField('e-ft', 'get your fortune told...')
        .addField('e-8ball', 'ask me anything...')
        .addField('e-ping', 'pong!')
        .addField('e-botprofile', 'gives my profile')
        .addField('e-discriminator', 'find users with a certain discriminator ex. user#discriminator')
        .addField('e-uptime', 'get my uptime from uptimerobot')
        .addField('e-servers', 'see how many servers have me!')
        .addField('e-servernames', 'see what servers have me!')
        .addField('e-source', 'get my source code')
        .addField('e-invite', 'invite me to your server')
        .addField('e-support', 'get the invite to my support server');
        return message.channel.send(help);
}

module.exports.help = {
    names: ['help']
}