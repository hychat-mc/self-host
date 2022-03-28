import { MessageEmbed } from 'discord.js';
import { Command } from '../interfaces/DiscordCommand';

export default {
	data: {
		name: 'invite',
		description: 'Invite a user to the guild!',
		options: [
			{
				name: 'user',
				description: 'What is the name of the user you want to invite?',
				type: 'STRING',
				required: true,
			},
		],
	},

	run: async (bot, interaction, args) => {
		const user = args[0];

		await bot.executeCommand(`/g invite ${user}`);

		const embed = new MessageEmbed()
			.setTitle('Invited!')
			.setDescription(`\`${user}\` has been invited to the guild!`)
			.setColor('GREEN');

		await interaction.reply({ embeds: [embed] });
	},
} as Command;
