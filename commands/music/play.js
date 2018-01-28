const Discord = require('discord.js');
const yt = require('ytdl-core');

module.exports.run = (bot, command, args, message, updateJSON, addFooter) => {
    if (!args[0]) return message.channel.send('You will need to specify a link!');
    const vc = message.member.voiceChannel;
    
    if (!vc) return message.channel.send('Please join a voice chat.');
    
    vc.join((connection) => {
        const stream = yt(args[0], { filter: audioonly });
        const dispatcher = connection.playStream(stream);
        
        yt.getInfo(args[0], (err, info) => message.channel.send(`Now playing **${info.title}**!`));
        
        dispatcher.on('end', async() => await vc.leave());
    });
};

module.exports.help = {
    names: ['play'],
    usage: 'e-command <args>',
    description: 'what?'
};
