const { Events } = require('discord.js');
const ErrorCodes = require("../../../utils/Error.js");

module.exports = {
    name: Events.InteractionCreate,
    activate: "on",
    async execute(interaction, client) {
        let cmdName = interaction.commandName;
        let customId = interaction.customId;
        let command;

        if (interaction.isChatInputCommand()) {
            command = client.commands.get(cmdName);
        } else if (interaction.isStringSelectMenu()) {
            command = client.selectmenus.get(customId);
        } else if (interaction.isButton()) {
            command = client.buttons.get(customId);
        } else if (interaction.isModalSubmit()) {
            command = client.modals.get(customId);
        }

        try {
            await command.execute(interaction, client);
        } catch (error) {
            console.log("Error caught: " + error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp("Something went wrong");
            } else {
                await interaction.reply(CodeError.InteractionExecutionError);
            }
        }   
    }
}