const Discord = require('discord.js');
const fs = require('fs');
const config = require(`./../../config.json`);

module.exports.run = function(bot, command, args, message){
        let usage = 'b-embed <url (ends with .png, .gif, .jpeg, or .jpg)>';
        if(args[0]==undefined || args[0]==''){
            return message.channel.send('please include the url...');
        }
        if(args[0].startsWith('./')||args[0].startsWith('../')){
            return message.channel.send('No way!');
        }
        if(!args[0].endsWith('.png') && !args[0].endsWith('.jpg') && !args[0].endsWith('.jpeg') && !args[0].endsWith('.gif')){
            return message.channel.send('Url must end with .png, .gif, .jpg, or .jpeg');
        }
        message.channel.sendFile(args[0]);
        return message.delete();
}

module.exports.help = {
    names: ['embed'],
    usage: 'b-embed <url>',
    description: 'Embed an image or gif'
}