const { SlashCommandBuilder } = require("discord.js");
const Helper = require("../../../../utils/Helper.js");

const cmd = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Sends a pong message!");

module.exports = {
    data: cmd,
    name: cmd.name,
    async execute(interaction) {
        const data = await Helper.ResolveInteraction(interaction, {
            ephemeral: true, type: "send"
        });

        return interaction[data]({
            embeds: [{
                type: "rich",
                color: 0x000000,
                description: `Pong!`
            }]
        });
    }
}