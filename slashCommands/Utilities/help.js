const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, SelectMenuBuilder, ButtonStyle, AttachmentBuilder, GuildTemplate, PermissionsBitField } = require('discord.js');
const config = require('../../config.json');
const fs = require('fs');
module.exports = {
    name: 'help',
	description: "Used to view a list of all of my commands",
	cooldown: 3000,
    type: ApplicationCommandType.ChatInput,
    run: async(client, interaction) => {
        try {
            let cod = [];
            const commandFolders = fs.readdirSync("./slashCommands/");
            for (const folder of commandFolders) {
                const commandFiles = fs .readdirSync(`./slashCommands/${folder}`).filter((file) => file.endsWith(".js")).map((f) => f.split('.js').shift());
                cod.push(
                    { "name":folder, "value":`\`\`\`${commandFiles.join('\n')}\`\`\``, "inline": true }
                )
            }
      
            const embed = new EmbedBuilder()
                .setTitle("command server")
                .setDescription("These are the commands available in the server, and the use is initially using (`\\`) and then the name of the command")
                .addFields(cod)
                .setFooter({ text: `by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic: true})})
                .setColor(0x8302fa)
                .setTimestamp()
            await interaction.reply({ embeds:[embed], ephemeral:true })
        } catch (error) {
            return console.log(error);
        }
    }
}