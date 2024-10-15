const Discord = require("discord.js")

module.exports = {

    name: "unban",
    description: "Unban a user",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    options: [
        {
            type: "user",
            name: "user",
            description: "The user to unban",
            required: true
        }, {
            type: "string",
            name: "reason",
            description: "The reason for the unban",
            required: false
        }
    ],

    async run(bot, message, args) {

        try {
            
            let user = args.getUser("user")
            if(!user) return message.reply("Invalid user")

            let reason = args.getString("reason")
            if(!reason) reason = "No reason provided";

            if(!(await message.guild.bans.fetch()).get(user.id)) return message.reply("This user is not banned in this guild");

            try {await user.send(`Hi, you have been unban by **${message.user.tag}** `)} catch (err) {}

            await message.reply(`**${message.user}** has unban **${user.tag}** `)

            await message.guild.members.unban(user, reason)

        } catch (err) {

            return message.reply("No user provided")

        }
    }
}