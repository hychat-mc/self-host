import { Command } from '../interfaces/DiscordCommand';
import { MessageEmbed } from 'discord.js';

export default {
	data: {
		name: 'changerank',
		description: 'Promote or demote a user in the guild!',
		options: [
			{
				name: 'command type',
				description: 'Would you like to promote or demote the user?',
				type: 'STRING',
				choices: [
					{
						name: 'promote',
						value: 'promote',
					},
					{
						name: 'demote',
						value: 'demote',
					},
				],
				required: true,
			},
			{
				name: 'user',
				description: 'What is the name of the user you want to promote/demote?',
				type: 'STRING',
				required: true,
			},
		],
	},

	run: async (bot, interaction, args) => {
		const commandType: string = args[0] as 'promote' | 'demote';
		const user: string = args[1];

		await bot.executeCommand(`/g ${commandType} ${user}`);

		const embed = new MessageEmbed()
			.setTitle(`${commandType}d!`)
			.setDescription(`${user} has been ${commandType}d!`)
			.setColor('RED');

		await interaction.reply({
			embeds: [embed],
		});
	},
} as Command;
