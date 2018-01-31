const Discord = require('discord.js');
const fs = require('fs');
const config = require(`./../../config.json`);

module.exports.run = function(bot, command, args, message, updateJSON, addFooter){
    if(args[0]==''||args[0]==undefined){
        let embed = new Discord.RichEmbed()
        .setColor('#50BB7C')
        .addField('Github', 'https://github.com/NicksWorld/Entrepreneur')
        addFooter(embed, bot, message, command, args);
        return message.channel.send(embed);
    }else{
        let embed = new Discord.RichEmbed()
        .setColor('#50BB7C')
        .addField(('https://github.com/NicksWorld/Entrepreneur/tree/master' + args[0]).split('/')[('https://github.com/NicksWorld/Entrepreneur/tree/master' + args[0]).split('/').length - 1], 'https://github.com/NicksWorld/Entrepreneur/tree/master' + args[0]);
        addFooter(embed, bot, message, command, args);
        return message.channel.send(embed);
    }
}

module.exports.help = {
    names: ['source'],
    usage: 'b-source',
    description: 'Get my source code'
}