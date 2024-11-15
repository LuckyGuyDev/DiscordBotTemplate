const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    activate: "once",
    execute(client) {
        return console.log(`Ready! Logged in as ${client.user.tag}`);
    }
}