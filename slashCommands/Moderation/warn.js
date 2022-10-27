const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const moment = require('moment');
const warnModel = require('../../Schema/warnModel');

module.exports = {
	name: 'warn',
	description: "Used to warn a specific user for a specific reason",
	cooldown: 3000,
	type: ApplicationCommandType.ChatInput,
    	default_member_permissions: 'ManageMessages',
        options: [

            {
                type: '1',
                name: 'add',
                description: 'To warn a specific member',
                options: [
                    {
                        name: 'user',
                        description: 'User',
                        type: '6',
                        required: true,
                    },
                    {
                        name: 'reason',
                        description: 'Reason',
                        type: 3,
                        required: true,
                    }
                ],
            },
            {
                type: '1',
                name: 'remove',
                description: 'To remove warns of a member for staff!',
                options: [
                    {
                        name: 'user',
                        description: 'User',
                        type: '6',
                        required: true,
                    },
                    {
                        name: 'id',
                        description: 'Warn ID',
                        type: 3,
                        required: true,
                    }
                ],
            }
           
        ],
	run: async (client, interaction) => {

        const subCommand = interaction.options.getSubcommand();
        const id = interaction.options.getString('id');
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');

        if(subCommand == 'add') {
            const warning = await warnModel.create({
                userId: user.id,
                staffId: interaction.user.id,
                timestamp: moment(Date.now()).format("L"),
                reason,
            });

            


            interaction.reply(`**DONE**\nUser: ${user}, Reason: ${reason}`)

        } else if (subCommand == 'remove') {



            if(warnModel.findById(id).size < 1) return interaction.reply(`:x: ايدي الوارن غير صالح!`);

            try {
                const warning = await warnModel.findByIdAndDelete(id)

                interaction.reply(`**DONE**\nUser: ${user}`)
            } catch (error) {
                return interaction.reply(`:x: ايدي الوارن غير صالح!`);
            }

        }

    }
};
