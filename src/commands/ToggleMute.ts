import { MessageEmbed } from 'discord.js';
import { Command } from '../interfaces/DiscordCommand';
import CapitaliseString from '../util/CapitaliseString';

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
						description: 'What is the name of the user you want to unmute?',
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

		let embed: MessageEmbed;
		try {
			await bot.executeTask(`/g ${type} ${user} ${duration}`);
			embed = new MessageEmbed()
				.setTitle(await CapitaliseString(`${type}d!`))
				.setDescription(`${user} was ${type}d` + (type === 'mute' ? ` for ${duration}!` : '!'))
				.setColor(type === 'mute' ? 'RED' : 'GREEN');
		} catch (e) {
			embed = new MessageEmbed()

				.setColor('RED')
				.setTitle('Error')
				.setDescription(e as string);
		}

		await interaction.reply({
			embeds: [embed],
		});
	},
} as Command;
