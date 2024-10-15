const Discord = require("discord.js")

module.exports = {

    name: "kick",
    description: "Kick a user",
    permisssion: Discord.PermissionFlagsBits.KickMembers,
    dm: false,
    options: [
        {
            type: "user",
            name: "utilisateur",
            description: "User to kick",
            required: true
        }, {
            type: "string",
            name: "raison",
            description: "The reason of the kick",
            required: false
        }
    ],

    async run(bot, message, args) {


        
        let user = args.getUser("utilisateur")
        if(!user) return message.reply("No member to kick")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("No member to kick") 

        let reason = args.getString("raison")
        if(!reason) reason = "No reason provided";

        if(message.user.id === user.id) return message.reply("You can't kick yourself")
        if((await message.guild.fetchOwner()).id === user.id) return message.reply("You can't kick the owner")
        if(member && !member.kickable) return message.reply("I can't kick this user")
        if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("I can't kick this user because they have a higher or equal role than me")
            
        try { await user.send(`Hi, you have been kick from **${message.guild.name}** server by **${message.user.tag}** for the reason : \`${reason}\``)} catch(err) {}   
        
        await message.reply(`${message.user} kick **${user.tag}** for the reason : \`${reason}\``)

        await member.kick(reason)

    }
}