// Modules
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const PathLoader = require('./utils/PathLoader.js');
const { BOT_TOKEN } = require("./config.json");
const path = require("path");

// Bot Intents
const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

// Metadata Collections
client.commands = new Collection();
client.buttons = new Collection();
client.modals = new Collection();
client.selectmenus = new Collection();

// Load all assets
const BOT = new PathLoader(client, {
    components: path.join(__dirname, 'src/Bot/Components'),
    events: path.join(__dirname, 'src/Bot/Events')
});

// Folder Paths
BOT.LoadComponents(client);
BOT.LoadEvents(client);

client.login(BOT_TOKEN);