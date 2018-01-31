const Discord = require('discord.js');
const fs = require('fs');
const config = require(`./../../config.json`);

module.exports.run = function(bot, command, args, message, updateJSON, addFooter){
        let usage = 'e-discriminator <discriminator>';
        if(args[0]==''||args[0]==undefined){
            let noNumberEmbed = new Discord.RichEmbed()
            .setColor('#FF4444')
            .setTitle('The first argument does not exist')
            .setDescription(`Please include the discriminator`)
            .addField('Usage', usage)
            addFooter(noNumberEmbed, bot, message, command, args);
            return message.channel.send(noNumberEmbed);
        }

        if(typeof Math.floor(args[0]) == 'int'){
            let noNumberEmbed = new Discord.RichEmbed()
            .setColor('#FF4444')
            .setTitle('The first argument is not a number')
            .addField('Usage', usage)
            addFooter(noNumberEmbed, bot, message, command, args);
            return message.channel.send(noNumberEmbed);
        }

        let out = '```js\n'
        let found = false;
        bot.guilds.forEach(function(guild){
            guild.members.forEach(function(member){
                if(member.user.discriminator==args[0]){
                    out+=member.user.username + '#' + member.user.discriminator + '\n';
                    found = true;
                }
            });
        });
        if(found){
            return message.channel.send(out + '```');
        }else{
            let noUsersEmbed = new Discord.RichEmbed()
            .setColor('#FF4444')
            .setTitle('The discriminator has no users')
            .addField('Usage', usage)
            addFooter(noUsersEmbed, bot, message, command, args);
            return message.channel.send(noUsersEmbed);
        }
}

module.exports.help = {
    names: ['discriminator', 'discrim'],
    usage: 'b-discrim <discriminator ex user#discriminator>',
    description: 'Get users with a discriminator'
}