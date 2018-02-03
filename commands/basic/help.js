const Discord = require('discord.js');
const fs = require('fs');
const config = require(`./../../config.json`);

module.exports.run = function(bot, command, args, message){
    let sucess = false;
    config.commands.forEach(function(cmd){
        if(cmd==args[0]){
            sucess = true;
        }
    });
    console.log(sucess);
    if(sucess){
        let helpEmbed = new Discord.RichEmbed();
        fs.readdir(`${config.commanddir + args[0]}`, function(err, files){
            if(err) return console.log(err);
        
            let jsfile = files.filter(f => f.split('.').pop() == 'js');
            if(jsfile.length<=0){
                console.log('error reading files');
            }
        
            jsfile.forEach(function(f, i){
                let props = require(`${config.commanddir + args[0]}/${f}`);
                helpEmbed.addField(props.help.usage, props.help.description);
            });
            message.channel.send(helpEmbed);
        });
    }else{
        let helpEmbed = new Discord.RichEmbed();
        config.commands.forEach(function(cmd){
            helpEmbed.addField(cmd, config.prefix + 'help ' + cmd);
        });
        message.channel.send(helpEmbed);
    }
}

module.exports.help = {
    names: ['help'],
    usage: config.prefix + 'help <section>',
    description: 'Get some help!'
}