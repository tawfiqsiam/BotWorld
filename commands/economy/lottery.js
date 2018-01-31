const Discord = require('discord.js');
const fs = require('fs');
const config = require(`../../config.json`);

module.exports.run = function(bot, command, args, message, updateJSON, addFooter){
        let usage = 'b-lottery buy'
        if(typeof args[0] == 'string'){
            if(args[0]=='buy'){
                let authorInfo;
                let index;
                let i;
                for(index = 0;index<config.users.length;index++){
                    if(config.users[index].id==message.author.id){
                        authorInfo = config.users[index];
                        i = index;
                    }
                }

                if(authorInfo==undefined){
                    config.users[i] = {"id": message.author.id, "balance": 0, "rank": 0, "username": message.author.username, "lastPayday": 'never'};
                    updateJSON();
                    authorInfo = config.users[i];
                }

                if(authorInfo.balance<25){
                    return message.reply('You need to have a b-bal of atleast $25');
                }

                if(authorInfo.tickets==undefined){
                    config.users[i].tickets = 0;
                    updateJSON();
                }

                config.users[i].tickets = Number(config.users[i].tickets) + 1;
                config.tickets.total = config.tickets.total + 1;
                config.users[i].balance = Number(config.users[i].balance) - 25;
                updateJSON();
                let embed = new Discord.RichEmbed()
                .setColor('#1B650E')
                .setDescription('Ticket Purchased')
                .addField('Tickets Total:', config.users[i].tickets)
                addFooter(embed, bot, message, command, args);
                return message.channel.send(embed);
            }else{
                return message.channel.send('The only acceptable argument is the following: buy\nPlease use b-lottery buy');
            }
        }else{
            return message.channel.send('The only acceptable argument is the following: buy\nPlease use b-lottery buy');
        }
}

module.exports.help = {
    names: ['lottery'],
    usage: 'b-lottery buy',
    description: 'Buy a lottery ticket'
}