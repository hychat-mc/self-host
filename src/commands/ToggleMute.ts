import { MessageEmbed } from 'discord.js';
import { Command } from '../interfaces/DiscordCommand';

export default {
	data: {
		name: 'togglemute',
		description: 'Mute or unmute a user in the guild!',
		options: [
			{
				name: 'mute',
				description: 'Mute a user in the guild!',
				type: 'SUB_COMMAND',
				options: [
					{
						name: 'user',
						description: 'What is the name of the user you want to mute?',
						type: 'STRING',
						required: true,
					},
					{
						name: 'duration',
						description: 'How long do you want to mute this user for?',
						type: 'STRING',
						required: true,
					},
				],
			},
			{
				name: 'unmute',
				description: 'Unmute a user in the guild!',
				type: 'SUB_COMMAND',
				options: [
					{
						name: 'user',
						description: 'What is the name of the user you want to mute?',
						type: 'STRING',
						required: true,
					},
				],
			},
		],
	},

	run: async (bot, interaction, args) => {
		const type = interaction.options.getSubcommand() as 'mute' | 'unmute';
		const user: string = args[0];
		const duration: string = args[1];

		await bot.executeCommand(`/g ${type} ${user} ${duration}`);

		const embed = new MessageEmbed()
			.setTitle(`${type}d!`)
			.setDescription(`${user} was ${type}d` + (type === 'mute' ? ` for ${duration}!` : '!'))
			.setColor(type === 'mute' ? 'RED' : 'GREEN');

		await interaction.reply({
			embeds: [embed],
		});
	},
} as Command;
