import { Event } from '../../interfaces/Event';
import { MessageEmbed } from 'discord.js';

export default {
	name: 'chat:guildLevelUp',
	runOnce: false,
	run: async (bot, message) => {
		const messageArray: string[] = message.toString().split(',');

		const guildLevel = Number(messageArray[0]) as number;

		const embed = new MessageEmbed()
			.setTitle('Guild Level Up!')
			.setDescription(`The guild has leveled up to level **${guildLevel}**!`)
			.setColor('GREEN')
			.setTimestamp();

		return await bot.sendEmbed('gc', [embed]);
	},
} as Event;
