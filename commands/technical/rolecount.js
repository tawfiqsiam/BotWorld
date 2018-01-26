const Discord = require('discord.js');
const fs = require('fs');
const config = require(`./../../config.json`);

module.exports.run = function(bot, command, args, message, updateJSON){
        let roleEmbed = new Discord.RichEmbed()
        .setColor('#50BB7C');

        message.guild.roles.forEach(function(role){
            roleEmbed.addField(role.name, role.members.size);
        });
      message.channel.send(roleEmbed);
}

module.exports.help = {
    names: ['rolecount', 'rc']
}