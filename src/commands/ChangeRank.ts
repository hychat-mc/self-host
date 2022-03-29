import { Command } from '../interfaces/DiscordCommand';
import { MessageEmbed } from 'discord.js';
import CapitaliseString from '../util/CapitaliseString';

export default {
	data: {
		name: 'changerank',
		description: 'Promote or demote a user in the guild!',
		options: [
			{
				name: 'type',
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
		const type: string = args[0] as 'promote' | 'demote';
		const user: string = args[1];

		let embed: MessageEmbed;
		try {
			await bot.executeTask(`/g ${type} ${user}`);
			embed = new MessageEmbed()
				.setTitle(await CapitaliseString(`${type}d!`))
				.setDescription(`${user} has been ${type}d!`)
				.setColor(type === 'promote' ? 'GREEN' : 'RED');
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
