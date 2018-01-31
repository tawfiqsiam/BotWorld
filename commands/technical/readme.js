const Discord = require('discord.js');
const fs = require('fs');
const config = require(`./../../config.json`);

module.exports.run = function(bot, command, args, message, updateJSON, addFooter){
    let out = '';


    fs.readdir('/app/commands/economy/', function(err, files){
        if(err) console.log(err);
        out += '* Economy<br>\n'
        let jsfile = files.filter(f => f.split('.').pop() == 'js');
        if(jsfile.length<=0){
            console.log('error reading files');
        }
    
        jsfile.forEach(function(f, i){
            let props = require(`/app/commands/economy/${f}`);
            out +=('    * b-' + props.help.names[0] + ` - ${props.help.description}` + '<br>\n');
        });

        fs.readdir('/app/commands/technical/', function(err, files){
            if(err) console.log(err);
            out += '* Technical<br>\n'
        
            let jsfile = files.filter(f => f.split('.').pop() == 'js');
            if(jsfile.length<=0){
                console.log('error reading files');
            }
        
            jsfile.forEach(function(f, i){
                let props = require(`/app/commands/technical/${f}`);
                out +=('    * b-' + props.help.names[0] + ` - ${props.help.description}` + '<br>\n');
            });

            fs.readdir('/app/commands/fun/', function(err, files){
                if(err) console.log(err);
                out += '* Fun<br>\n'
                let jsfile = files.filter(f => f.split('.').pop() == 'js');
                if(jsfile.length<=0){
                    console.log('error reading files');
                }
            
                jsfile.forEach(function(f, i){
                    let props = require(`/app/commands/fun/${f}`);
                    out +=('    * b-' + props.help.names[0] + ` - ${props.help.description}` + '<br>\n');
                });
                fs.readdir('/app/commands/admin/', function(err, files){
                    if(err) console.log(err);
                    out += '* Admin<br>\n'
                    let jsfile = files.filter(f => f.split('.').pop() == 'js');
                    if(jsfile.length<=0){
                        console.log('error reading files');
                    }
                
                    jsfile.forEach(function(f, i){
                        let props = require(`/app/commands/admin/${f}`);
                        out +=('    * b-' + props.help.names[0] + ` - ${props.help.description}` + '<br>\n');
                    });

                    fs.readdir('/app/commands/music/', function(err, files){
                        if(err) console.log(err);
                        out += '* Music<br>\n'
                        let jsfile = files.filter(f => f.split('.').pop() == 'js');
                        if(jsfile.length<=0){
                            console.log('error reading files');
                        }
                    
                        jsfile.forEach(function(f, i){
                            let props = require(`/app/commands/music/${f}`);
                            out +=('    * b-' + props.help.names[0] + ` - ${props.help.description}` + '<br>\n');
                        });
                        return message.channel.send('```' + out + '```');
                    });
                });
            });
        });
    });
}



module.exports.help = {
    names: ['readme'],
    usage: 'b-readme',
    description: 'Make readme for commands'
}