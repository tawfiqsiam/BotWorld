const Discord = require('discord.js');
const fs = require('fs');
const config = require(`./../../config.json`);

module.exports.run = function(bot, command, args, message, updateJSON, addFooter){
        let ball = new Discord.RichEmbed()
        .setColor('#50BB7C')
        .setTitle(args.join(' '))
        .setImage(`https://raw.githubusercontent.com/NicksWorld/DiscordEconomy/master/8ball%20images/${Math.floor(Math.random() * 8) + 1}.png`)
        addFooter(ball, bot, message, command, args);
        message.channel.send(ball);
}

module.exports.help = {
    names: ['8ball'],
    usage: 'e-8ball <question>',
    description: 'Ask a question...'
}