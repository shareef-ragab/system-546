var errors = 0;

exports.run = async function(client, oldChannel, newChannel) {
    if(premium_servers.includes(oldChannel.guild.id)) return;
    var result = sql.query(`SELECT * FROM logs WHERE guildid = ${oldChannel.guild.id}`)
    var chat = sql.query(`SELECT * FROM logschat WHERE guildid = ${oldChannel.guild.id}`)
    if(!result.length) return;
    if(result[0].updatechannel == 1) {
    if(oldChannel.name !== newChannel.name) {
        if(result[0].author == 0) {
            const embed = new discord.RichEmbed()
            .setAuthor(  oldChannel.guild.name, oldChannel.guild.iconURL)
            .setFooter(  oldChannel.guild.name, oldChannel.guild.iconURL)
            .setDescription(`**Channel Updated:  Old Name : ${oldChannel.name}  New name : ${newChannel.name} **`)
            .setColor('#00FF00')
            .setTimestamp();
            if(chat[0]) { 
                if(client.channels.has(chat[0].updatechannel)) {
                    client.channels.get(chat[0].updatechannel).send({embed}).catch(err => errors++);
                    } else {
                        client.channels.get(result[0].chat).send({embed}).catch(err => errors++);
                    } 
                    } else { 
                    client.channels.get(result[0].chat).send({embed}).catch(err => errors++);
                    }
    }
}
    }

};
      