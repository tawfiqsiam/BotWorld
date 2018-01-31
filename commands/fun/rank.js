const Discord = require('discord.js');
const fs = require('fs');
const config = require(`./../../config.json`);

module.exports.run = function(bot, command, args, message, updateJSON, addFooter){
           let usage = 'b-rank <user mention (optional)>';
        let user = message.author.id;
        if(args[0]!=null){
            if(bot.users.find("id", args[0].replace('<', '').replace('!', '').replace('@', '').replace('>', ''))){
                user = args[0].replace('<', '').replace('!', '').replace('@', '').replace('>', '');
            }else{
                let noSuchUserEmbed = new Discord.RichEmbed()
                .setColor('#FF4444')
                .setTitle('Cannot find user')
                .setDescription(`User '${args[0]}' couldn't be found!`)
                .addField('Usage', usage)
                addFooter(noSuchUserEmbed, bot, message, command, args);
                return message.channel.send(noSuchUserEmbed);
            }
        }
        let authorInfo;
        for(var i = 0;i<config.users.length;i++){
            if(config.users[i].id==user){
                authorInfo = config.users[i];
            }
        }
        if(authorInfo==undefined){
            config.users[i] = {"id": user, "balance": 0, "rank": 0, "username": bot.users.get(user).username, "lastPayday": 'never'};
            updateJSON();
            authorInfo = config.users[i];
        }

        let rankEmbed = new Discord.RichEmbed()
        .setDescription(`${bot.users.get(user).username}'s Rank`)
        .setColor('#50BB7C')
        .addField('Rank', authorInfo.rank)
        addFooter(rankEmbed, bot, message, command, args);
        return message.channel.send(rankEmbed);
}

module.exports.help = {
    names: ['rank'],
    usage: 'b-rank <user mention (optional)>',
    description: 'Get a users rank'
}