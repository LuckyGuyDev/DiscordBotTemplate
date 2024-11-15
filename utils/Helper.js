class Helper {
    /**
     * @param {Object} interaction Discord interaction data.
     * @param {Object} property Properties of the command i.e. {ephemeral: true, type:"send"}
     * @returns {Promise<string>}
     */
    static async ResolveInteraction(interaction, property) {
        const { ephemeral, type } = property;
        const deploy = {
            "send": "deferReply",
            "update": "deferUpdate"
        };

        const options = {
            ephemeral,
            fetchReply: true
        };

        const isDeferred = interaction.isDeferred;
        let API = "followup"; // set default "followup"

        if (!isDeferred) {
            await interaction[deploy[type]](options);
            API = "editReply";
        }

        return API;
    }
}

module.exports = Helper;