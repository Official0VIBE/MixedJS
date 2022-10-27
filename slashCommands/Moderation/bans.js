const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, SelectMenuBuilder, ButtonStyle, AttachmentBuilder, GuildTemplate, PermissionsBitField, PermissionFlagsBits } = require('discord.js');
const config = require('../../config.json');
module.exports = {
    name: 'bans',
	description: "Used to display a list of all banned users",
	cooldown: 3000,
    type: ApplicationCommandType.ChatInput,
    run: async(client, interaction) => {
        try {
            if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) return interaction.deferUpdate;
            interaction.guild.bans.fetch()
                .then(banned => {
                    let list = banned.map(ban => `User: ${ban.user.username} | ID: ${ban.user.id}`).join('');
                    if (list.length >= 1950) list = `${list.slice(0, 1948)}...`;
                    if (banned.size == 0) return interaction.reply({ embeds: [new EmbedBuilder().setDescription(`⚠️ | No member is banned`).setTimestamp().setColor(0x8302fa)]});
                    interaction.editReply({
                        embeds: [new EmbedBuilder()
                            .setDescription(`👥  **List of banned members**\n${list}`)
                            .setTimestamp()
                            .setColor(0x8302fa).setFooter({ text: `by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL()
                        })]
                    });
                });
        } catch (error) {
            return console.log(error);
        }
    }
}