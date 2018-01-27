const Discord = require('discord.js');
const fs = require('fs');
const config = require(`/app/config.json`);

module.exports.run = function(bot, command, args, message, updateJSON, addFooter){
        if(args[0]=='economy'){

            let economyCommands = new Discord.RichEmbed()
            .setColor('#7373FF')
            .setTitle('Economy help');

            fs.readdir('/app/commands/economy/', function(err, files){
                if(err) console.log(err);
            
                let jsfile = files.filter(f => f.split('.').pop() == 'js');
                if(jsfile.length<=0){
                    console.log('error reading files');
                }
            
                jsfile.forEach(function(f, i){
                    let props = require(`/app/commands/economy/${f}`);
                    economyCommands.addField('e-' + props.help.names[0], props.help.description);
                });
                addFooter(economyCommands, bot, message, command, args);
                return message.channel.send(economyCommands);
            });


        }else if(args[0]=='fun'){

            let funCommands = new Discord.RichEmbed()
            .setColor('#7373FF')
            .setTitle('Fun help');

            fs.readdir('/app/commands/fun/', function(err, files){
                if(err) console.log(err);
            
                let jsfile = files.filter(f => f.split('.').pop() == 'js');
                if(jsfile.length<=0){
                    console.log('error reading files');
                }
            
                jsfile.forEach(function(f, i){
                    let props = require(`/app/commands/fun/${f}`);
                    funCommands.addField('e-' + props.help.names[0], props.help.description);
                });
                addFooter(funCommands, bot, message, command, args);
                return message.channel.send(funCommands);
            });


        }else if(args[0]=='technical'){

            let technicalCommands = new Discord.RichEmbed()
            .setColor('#7373FF')
            .setTitle('Technical help');

            fs.readdir('/app/commands/technical/', function(err, files){
                if(err) console.log(err);
            
                let jsfile = files.filter(f => f.split('.').pop() == 'js');
                if(jsfile.length<=0){
                    console.log('error reading files');
                }
            
                jsfile.forEach(function(f, i){
                    let props = require(`/app/commands/technical/${f}`);
                    technicalCommands.addField('e-' + props.help.names[0], props.help.description);
                });
                addFooter(technicalCommands, bot, message, command, args);
                return message.channel.send(technicalCommands);
            });


        }else if(args[0]=='admin'){
            
            let adminCommands = new Discord.RichEmbed()
            .setColor('#7373FF')
            .setTitle('Admin help');

            fs.readdir('/app/commands/admin/', function(err, files){
                if(err) console.log(err);
            
                let jsfile = files.filter(f => f.split('.').pop() == 'js');
                if(jsfile.length<=0){
                    console.log('error reading files');
                }
            
                jsfile.forEach(function(f, i){
                    let props = require(`/app/commands/admin/${f}`);
                    adminCommands.addField('e-' + props.help.names[0], props.help.description);
                });
                addFooter(adminCommands, bot, message, command, args);
                return message.channel.send(adminCommands);
            });
            
        }else{
            let help = new Discord.RichEmbed()
            .setColor('#7373FF')
            .setTitle('Catagories:')
            .addField('Economy', 'e-help economy')
            .addField('Fun', 'e-help fun')
            .addField('Technical', 'e-help technical')
            .addField('Admin', 'e-help admin');
            addFooter(help, bot, message, command, args);
            return message.channel.send(help);
        }
}

module.exports.help = {
    names: ['help'],
    usage: 'e-help <section>',
    description: 'Get help'
}