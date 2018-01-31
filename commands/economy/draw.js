const Discord = require('discord.js');
const fs = require('fs');
const config = require(`./../../config.json`);

module.exports.run = function(bot, command, args, message, updateJSON, addFooter){
        if(command=='draw'){
        let ticketChose = Math.floor(Math.random() * config.tickets.total) + 1;
        let ticketOn = 0;
        if(config.tickets.total == 0){
            let noTicketsEmbed = new Discord.RichEmbed()
            .setColor('#FF2D40')
            .setTitle('No tickets have been purchased, this time...')
            .addField('How to buy?', 'Use b-lottery buy to purchase a ticket')
            addFooter(noTicketsEmbed, bot, message, command, args);
            return message.channel.send(noTicketsEmbed);
        }
        for(var i=0;i<config.users.length;i++){
            if(config.users[i].tickets>=1){
                for(var i2=0;i2<config.users[i].tickets;i2++){
                    ticketOn++;
                    if(ticketOn==ticketChose){
                        config.users[i].balance += config.tickets.total * 25;
                        message.channel.send(`${config.users[i].username} won $${config.tickets.total * 25} in the lottery`);
                        config.tickets.total = 0;
                        for(var index = 0;index<config.users.length;index++){
                            config.users[index].tickets = 0;
                        }
                    }
                }
            }
        }
    }
}

module.exports.help = {
    names: ['draw'],
    usage: 'b-draw',
    description: 'Draws the winning lottery ticket'
}