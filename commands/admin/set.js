const Discord = require('discord.js');
const fs = require('fs');
const config = require(`../../config.json`);

module.exports.run = function(bot, command, args, message, updateJSON){
    let user;
    if(message.author.username=='NicksWorld'){
        if(bot.users.find("id", args[0].replace('<', '').replace('!', '').replace('@', '').replace('>', ''))){
            user = args[0].replace('<', '').replace('!', '').replace('@', '').replace('>', '');
            for(var i = 0;i<config.users.length;i++){
                if(config.users[i].id==user){
                    config.users[i].balance = Number(args[1]);
                    let successEmbed = new Discord.RichEmbed()
                    .setColor('#50BB7C')
                    .addField('Set', `${config.users[i].username}`)
                    .addField('Amount', `${args[1]}`)
                    .setFooter('DiscordEconomy#1500 ' + new Date().toISOString(), bot.user.avatarURL);
                    return message.channel.send(successEmbed);
                }
            }
        }
    }
}

module.exports.help = {
    names: ['set']
}