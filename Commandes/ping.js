const Discord = require("discord.js")

module.exports = {

    name: "ping",
    description: "Display bot ping",
    permission: "Aucune",
    dm: "true",


    async run(bot, message, args) {

        await message.reply(`Ping : \`${bot.ws.ping}\``)


    }
}