const { REST, Routes } = require("discord.js");
const dotenv = require("dotenv");
const fs = require("fs");

// Load env
dotenv.config();

const { CLIENT_ID, BOT_TOKEN } = process.env;

const commands = [];

const targetPath = "./src/Bot/Components/Commands";
const commandFiles = fs
  .readdirSync(targetPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`${targetPath}/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(BOT_TOKEN);

async function Command(isDelete, cmd) {
  if (isDelete) {
    const appCmd = Routes.applicationCommand(CLIENT_ID, cmd)
    rest.delete(appCmd)
      .then(() => console.log('Successfully deleted guild command'))
      .catch(console.error);
  } else {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);
    const data = await rest.put(
      Routes.applicationCommands(CLIENT_ID),
      { body: commands }
    );
    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  }
}

(async () => {
  try {
    Command(false, "1290259386970931221");
  } catch (error) {
    console.error(error);
  }
})();