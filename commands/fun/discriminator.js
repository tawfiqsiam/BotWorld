const Discord = require('discord.js');
const fs = require('fs');
const config = require(`./../../config.json`);

module.exports.run = function(bot, command, args, message, updateJSON){
        let usage = 'e-discriminator <discriminator>';
        if(args[0]==''||args[0]==undefined){
            let noNumberEmbed = new Discord.RichEmbed()
            .setColor('#FF4444')
            .setTitle('The first argument does not exist')
            .setDescription(`Please include the discriminator`)
            .addField('Usage', usage)
            .setFooter('DiscordEconomy#1500 ' + new Date().toISOString(), bot.user.avatarURL);
            return message.channel.send(noNumberEmbed);
        }

        if(Math.floor(args[0]) != args[0]){
            let noNumberEmbed = new Discord.RichEmbed()
            .setColor('#FF4444')
            .setTitle('The first argument is not a number')
            .addField('Usage', usage)
            .setFooter('DiscordEconomy#1500 ' + new Date().toISOString(), bot.user.avatarURL);
            return message.channel.send(noNumberEmbed);
        }

        let out = '```js\n'
        let found = false;
        bot.users.forEach(function(user){
            if(user.discriminator==args[0]){
                out+=user.username + '#' + user.discriminator + '\n';
                found = true;
            }
        });
        if(found){
            return message.channel.send(out + '```');
        }else{
            let noUsersEmbed = new Discord.RichEmbed()
            .setColor('#FF4444')
            .setTitle('The discriminator has no users')
            .addField('Usage', usage)
            .setFooter('DiscordEconomy#1500 ' + new Date().toISOString(), bot.user.avatarURL);
            return message.channel.send(noUsersEmbed);
        }
}

module.exports.help = {
    names: ['discriminator', 'discrim']
}