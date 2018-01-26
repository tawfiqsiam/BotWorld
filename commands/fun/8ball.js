const Discord = require('discord.js');
const fs = require('fs');
const config = require(`./../../config.json`);

module.exports.run = function(bot, command, args, message, updateJSON){
        let ball = new Discord.RichEmbed()
        .setColor('#50BB7C')
        .setTitle(args.join(' '))
        .setImage(`https://raw.githubusercontent.com/NicksWorld/DiscordEconomy/master/8ball%20images/${Math.floor(Math.random() * 8) + 1}.png`)
        message.channel.send(ball);
}

module.exports.help = {
    names: ['8ball']
}