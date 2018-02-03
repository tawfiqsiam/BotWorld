const Discord = require('discord.js');
const fs = require('fs');
const config = require(`./../../config.json`);
const economy = require('./../../plugins/economy.js')

module.exports.run = function(bot, command, args, message){
    if(args[0]!=undefined && args[0]!=''){
        if(bot.users.find("id", args[0].replace('<', '').replace('!', '').replace('@', '').replace('>', ''))){
            let balanceEmbed = new Discord.RichEmbed()
            .addField(`${bot.users.get(args[0].replace('<', '').replace('!', '').replace('@', '').replace('>', '')).username}'s Balance`, `$${economy.getBalance(args[0].replace('<', '').replace('!', '').replace('@', '').replace('>', ''))}`)
            message.channel.send(balanceEmbed);
        }else{
            console.log('test')
        }
    }else{
        let balanceEmbed = new Discord.RichEmbed()
        .addField(`${message.author.username}'s Balance`, `$${economy.getBalance(message.author.id)}`);
        message.channel.send(balanceEmbed);
    }
}

module.exports.help = {
    names: ['balance'],
    usage: 'b-8ball <question>',
    description: 'Ask a question...'
}