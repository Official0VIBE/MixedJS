const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder } = require('discord.js');

const warnModel = require('../../Schema/warnModel');
const moment = require('moment');

module.exports = {
	name: 'warnings',
	description: "Used to view warnings of a specific user",
	cooldown: 3000,
	type: ApplicationCommandType.ChatInput,
    	default_member_permissions: 'ManageMessages',
        options: [
            {
                name: 'user',
                description: 'User',
                type: 6,
                required: true
            },
        ],
	run: async (client, interaction) => {
        const user = interaction.options.getUser('user');


        const userWarnings = await warnModel.find({
            userID: user
        })

        if(userWarnings.id == undefined || userWarnings.id == null) return interaction.reply({ content: `:x: ${user} ماعنده وارن!`});

        const warnembed = await new EmbedBuilder()
        .setTitle(`وارنات ${user.username}`)
        .setColor('Blue')
        .setDescription(
            `ايدي الوارن: ${userWarnings.id}\n` +
            `سبب الوارن: ${userWarnings.Reason}\n` +
            `تاريخ الوارن: ${moment(userWarnings.timestamp).format("MMMM Do YYYY")}\n` +
            `المعطي: ${interaction.guild.members.cache.get(userWarnings.ModID) || 'خرج من السيرفر'}\n\n`
        )

        await interaction.reply({
            embeds: [warnembed]
        })


    }
};
